import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AppLayout from '../../layout/appLayout';
import Header from './components/header';
import ManageCompanyButton from './components/manageCompanyButton';
import Departments from '../../components/departments';
import CompanyDetails from './components/companyDetails';

import { CompanyType } from '../../services';
import useAuth from '../../hooks/useAuth';

//#region Fazer chamada a API
import departments from '../../utils/data/departments';
import useCompany from '../../hooks/useCompany';
//#endregion

import useStyles from './styles';

const CompanyDashboard: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const auth = useAuth();
    const companyData = useCompany();

    const [company] = useState<CompanyType | null>(companyData);

    useEffect(() => {
        const checkCompanyData = () => {
            if (company) document.title = `Dashboard - ${company.username}`;
            else {
                // alerta de erro
                history.push('/escolha-da-empresa');
            }
        };
        checkCompanyData();
    }, [company, history]);

    const { user } = auth;
    const { username } = company!;

    return (
        <AppLayout>
            <Box className={classes.container}>
                <Header name={user!.name} />
                <Grid
                    container
                    spacing={3}
                    className={classes.contentContainer}
                >
                    <Grid item xs={12} md={6}>
                        {/* Esconder obotão baseado no tipo de usuário */}
                        <ManageCompanyButton company={company!} />
                        <Departments
                            baseURL={`${username}/departamento`}
                            departments={departments}
                            containerStyles={classes.departments}
                            breakpoints={{ xs: 12, sm: 6, md: 6 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CompanyDetails data={company!} />
                    </Grid>
                </Grid>
            </Box>
        </AppLayout>
    );
};

export default CompanyDashboard;
