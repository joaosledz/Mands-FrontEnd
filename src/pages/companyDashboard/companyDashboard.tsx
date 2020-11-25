import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackbarUtils from '../../utils/functions/snackbarUtils';

import {
    UserCompanyType,
    companyApi,
    permissionApi,
    departmentApi,
} from '../../services';
import useAuth from '../../hooks/useAuth';
import useCompany from '../../hooks/useCompany';

import AppLayout from '../../layout/appLayout';
import ManageCompanyButton from './components/manageCompanyButton/manageCompanyButton';
import Departments from './components/departments';
import CompanyDetails from './components/companyDetails/companyDetails';
//#endregion

import useStyles from './styles';

const CompanyDashboard: React.FC = () => {
    const classes = useStyles();
    const params = useParams<{ companyName: string }>();
    const auth = useAuth();
    const companyData = useCompany();

    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState<UserCompanyType | null>(companyData);
    // console.log(companyData);
    useEffect(() => {
        const getDepartmentData = async (company: UserCompanyType) => {
            try {
                const response = await departmentApi.listByCompany(
                    company.companyId
                );
                const data: UserCompanyType = {
                    ...company,
                    departments: [...response.data],
                };
                setCompany(data);
                sessionStorage.setItem(
                    '@Mands:CompanyData',
                    JSON.stringify(data)
                );
                return data;
            } catch (error) {
                SnackbarUtils.error(
                    'Não foi possível obter os dados de departamento'
                );
            } finally {
                setLoading(false);
            }
        };

        const handleCompanyParam = async () => {
            setLoading(true);
            try {
                const response = await companyApi.showAllCompanyData(
                    params.companyName
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
                // alerta de troca de empresa bem sucedida
            } catch (error) {
                SnackbarUtils.error(
                    'Não foi possível obter os dados da empresa.'
                );
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const checkCompanyData = () => {
            if (company) {
                document.title = `Dashboard - ${company.username}`;
                // Caso o usuário troque de empresa
                if (
                    params.companyName.toLowerCase() !==
                    company.username.toLowerCase()
                )
                    handleCompanyParam();
                // Caso o usuário venha da tela de escolha da empresa
                else if (!company.departments) {
                    getDepartmentData(company);
                } else setLoading(false);
                // Caso o usuário entre pela URL
            } else {
                // alerta de erro
                handleCompanyParam();
            }
        };
        checkCompanyData();
    }, [params, company]);

    const { user } = auth;

    return (
        <AppLayout loading={loading}>
            <Box className={classes.container}>
                <Grid container component="section">
                    <Grid item xs={12}>
                        <Typography className={classes.name}>
                            Seja bem-vindo ao Mands, {user!.name}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={3}
                    className={classes.contentContainer}
                >
                    {company ? (
                        <Fragment>
                            <Grid item xs={12} md={6}>
                                {company.userPermission?.editCompany && (
                                    <ManageCompanyButton company={company} />
                                )}
                                <Departments
                                    departments={company.departments}
                                    containerStyles={
                                        company.userPermission?.editCompany
                                            ? classes.departments
                                            : undefined
                                    }
                                    breakpoints={{ xs: 12, sm: 6, md: 6 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CompanyDetails data={company} />
                            </Grid>
                        </Fragment>
                    ) : (
                        <CircularProgress color="primary" />
                    )}
                </Grid>
            </Box>
        </AppLayout>
    );
};

export default CompanyDashboard;
