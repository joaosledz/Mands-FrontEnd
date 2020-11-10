import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { CompanyType } from '../../services';
import useAuth from '../../hooks/useAuth';
import useCompany from '../../hooks/useCompany';

import AppLayout from '../../layout/appLayout';
import ManageCompanyButton from './components/manageCompanyButton/manageCompanyButton';
import Departments from '../../components/departments';
import CompanyDetails from './components/companyDetails/companyDetails';
//#region Fazer chamada a API
import departments from '../../utils/data/departments';
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
            if (company) {
                document.title = `Dashboard - ${company.username}`;
                // alerta de bem-vindo
            } else {
                // alerta de erro
                history.push('/escolha-da-empresa');
            }
        };
        checkCompanyData();
    }, [company, history]);

    const { user } = auth;
    const { username, companyUsers } = company!;
    console.log(companyUsers);
    const AdminCompanyPermission = companyUsers[0]!.compPermission.editCompany;

    return (
        <AppLayout>
            <Box className={classes.container}>
                <Grid container component="section">
                    <Grid item xs={6}>
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
                    <Grid item xs={12} md={6}>
                        {AdminCompanyPermission && (
                            <ManageCompanyButton company={company!} />
                        )}
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
