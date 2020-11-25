import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { permissionApi, companyApi, UserCompanyType } from '../../../services';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';
import useCompanyData from '../../../hooks/useCompany';
import CompanyContext from './contexts/company';

import AppLayout from '../../../layout/appLayout';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import useStyles from './styles';

type Props = {
    title: string;
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ title, children }) => {
    const classes = useStyles();
    const params = useParams<{ company: string }>();
    const history = useHistory();
    const companyData = useCompanyData();

    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState<UserCompanyType | null>(companyData);

    useEffect(() => {
        const getCompanyData = async () => {
            setLoading(true);
            try {
                const response = await companyApi.showAllCompanyData(
                    params.company
                );
                const permissionResponse = await permissionApi.userPermissions(
                    response.data.companyId
                );
                const data: UserCompanyType = {
                    ...response.data,
                    userPermission: { ...permissionResponse.data },
                };
                // console.log(data);
                setCompany(data);
                sessionStorage.setItem(
                    '@Mands:CompanyData',
                    JSON.stringify(data)
                );
                return Promise.resolve(data);
                // alerta de troca de empresa bem sucedida
            } catch (error) {
                SnackbarUtils.error(
                    'Não foi possível obter os dados de empresa.'
                );
                console.log(error);
                return Promise.reject(error);
            } finally {
                setLoading(false);
            }
        };

        const checkCompanyData = async () => {
            if (company && company.userPermission!.editCompany) {
                // Caso o usuário troque de empresa
                if (
                    params.company.toLowerCase() !==
                    company.username.toLowerCase()
                )
                    getCompanyData();
                else setLoading(false);
                // Caso o usuário entre pela URL
            } else {
                const response = await getCompanyData();
                if (response && response.userPermission!.editCompany)
                    setLoading(false);
                else history.push('/');
            }
        };
        checkCompanyData();
    }, [company, history, params]);

    return (
        <AppLayout loading={loading}>
            <Box className={classes.container}>
                <Header name={title} />
                <Grid container spacing={3}>
                    <Grid item lg={2}>
                        <SideBar />
                    </Grid>
                    <CompanyContext.Provider
                        value={{
                            loading,
                            company,
                        }}
                    >
                        {children}
                    </CompanyContext.Provider>
                </Grid>
            </Box>
        </AppLayout>
    );
};

export default Layout;
