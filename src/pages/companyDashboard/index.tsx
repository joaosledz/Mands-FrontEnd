import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AppLayout from '../../layout/appLayout';
import Header from './components/header';
import ManageCompanyButton from './components/manageCompanyButton';
import Departments from '../../components/departments';
import CompanyDetails from './components/companyDetails';

import handleUrlParamName from '../../utils/functions/handleUrlParamName';
import TypeParams from '../../models/params';
import CompanyType from '../../models/company';
//#region Fazer chamada a API
import departments from '../../utils/data/departments';
import companies from '../../utils/data/companies';
import useCompany from '../../hooks/useCompany';
//#endregion

import useStyles from './styles';

const CompanyDashboard: React.FC = () => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const company: CompanyType = useCompany();

    useEffect(() => {
        // Nome da empresa dinamico
        document.title = `Dashboard - ${company.name}`;
    }, [company.name]);

    return (
        <AppLayout /*layoutStyles={classes.layout}*/>
            {/* Dinamico */}
            <Box className={classes.container}>
                <Header name="Ana" jobTitle="Gerente" />
                <Grid
                    container
                    spacing={3}
                    className={classes.contentContainer}
                >
                    <Grid item xs={12} md={6}>
                        {/* Esconder obotão baseado no tipo de usuário */}
                        <ManageCompanyButton company={company} />
                        <Departments
                            baseURL={`${handleUrlParamName(
                                params.companyName
                            )}/departamento`}
                            departments={departments}
                            containerStyles={classes.departments}
                            breakpoints={{ xs: 12, sm: 6, md: 6 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CompanyDetails companies={companies} data={company} />
                    </Grid>
                </Grid>
            </Box>
        </AppLayout>
    );
};

export default CompanyDashboard;
