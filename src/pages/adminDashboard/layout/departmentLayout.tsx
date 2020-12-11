import React, { Fragment, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import TypeParams from '../../../models/params';
import useCompany from '../../../hooks/useCompany';
import useDepartment from '../../../hooks/useDepartment';
import useProject from '../../../hooks/useProject';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';

import AppLayout from '../../../layout/appLayout';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import useStyles from './styles';

type Props = {
    title?: string;
    menu?: boolean;
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({
    title = 'Admin',
    menu = false,
    children,
}) => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const history = useHistory();
    const { company, getCompanyData, loading, setLoading } = useCompany();
    const {
        department,
        getDepartmentData,
        loading: departmentLoading,
    } = useDepartment();
    const { loading: projectLoading } = useProject();

    useEffect(() => {
        const checkCompanyData = async () => {
            // Verifica a permissão do usuário
            if (company && company.userPermission!.editCompany) {
                try {
                    // Verifica se os dados armazenados batem com a url
                    if (params.department) {
                        if (department) {
                            if (
                                params.department.toLowerCase() !==
                                department.name.toLowerCase()
                            ) {
                                console.log('Layout: mudança de url');
                                await getDepartmentData(
                                    params.company,
                                    params.department!
                                );
                            } else setLoading(false);
                        } else {
                            console.log('Layout: caso não tenha department');
                            await getDepartmentData(
                                params.company,
                                params.department!
                            );
                        }
                    } else setLoading(false);
                } catch (error) {
                    SnackbarUtils.error(error.message);
                }
            }
        };
        checkCompanyData();
    }, [
        company,
        history,
        params,
        getCompanyData,
        setLoading,
        department,
        getDepartmentData,
    ]);

    return (
        <AppLayout loading={[loading, departmentLoading, projectLoading]}>
            {menu ? (
                <Box className={classes.container}>
                    <Header name={title} />
                    <Grid container spacing={3}>
                        <Grid item lg={2}>
                            <SideBar />
                        </Grid>
                        {children}
                    </Grid>
                </Box>
            ) : (
                <Fragment>{children}</Fragment>
            )}
        </AppLayout>
    );
};

export default Layout;
