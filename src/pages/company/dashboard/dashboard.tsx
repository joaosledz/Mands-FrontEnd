import React, { useEffect, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';

import { UserCompanyType, departmentApi } from '../../../services';
import useAuth from '../../../hooks/useAuth';
import useCompany from '../../../hooks/useCompany';

import AppLayout from '../../../layout/appLayout';
import ManageCompanyButton from './components/manageCompanyButton/manageCompanyButton';
import Departments from './components/departments';
import CompanyDetails from './components/companyDetails/companyDetails';
//#endregion

import useStyles from './styles';

const CompanyDashboard: React.FC = () => {
    const classes = useStyles();
    const { user } = useAuth();
    const { company, updateCompany, loading, setLoading } = useCompany();

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
                updateCompany(data);

                return data;
            } catch (error) {
                SnackbarUtils.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        const checkCompanyData = () => {
            if (company) {
                document.title = `Dashboard - ${company.username}`;
                if (!company.departments) {
                    setLoading(true);
                    getDepartmentData(company);
                } else setLoading(false);
            }
        };
        checkCompanyData();
    }, [company, updateCompany, setLoading]);

    return (
        <AppLayout loading={loading}>
            <Box className={classes.container}>
                <Grid container component="section">
                    <Grid item xs={12}>
                        <Typography className={classes.name}>
                            Seja bem-vindo ao Mands, {user?.name}
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
