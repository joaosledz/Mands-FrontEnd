import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import TypeParams from '../../models/params';
import useCompany from '../../hooks/useCompany';
import useDepartment from '../../hooks/useDepartment';
import snackbarUtils from '../../utils/functions/snackbarUtils';

import AppLayout from '../../layout/appLayout';
import Header from './header/header';
import DepartmentDetails from './departmentDetails/departmentDetails';
import Projects from './projects/projects';
import useStyles from './styles';

const DepartmentDashboard: React.FC = () => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const { company, getCompanyData, loading, setLoading } = useCompany();
    const { department, getDepartmentData } = useDepartment();

    useEffect(() => {
        const handleDepartmentParam = async () => {
            setLoading(true);
            try {
                if (company && department) {
                    document.title = `Departamento - ${department.name}`;
                    if (
                        params.department!.toLowerCase() !==
                        department.name.toLowerCase()
                    )
                        getDepartmentData(company.username, department.name);
                    // Fix: verificar bug na troca de departamento, pelas rotas
                    else setLoading(false);
                } else {
                    if (company) {
                        getDepartmentData(
                            company!.username,
                            params.department!
                        );
                    } else {
                        const response = await getCompanyData(params.company);
                        getDepartmentData(
                            response.username,
                            params.department!
                        );
                    }
                }
            } catch (error) {
                snackbarUtils.error(error.message);
            }
        };
        handleDepartmentParam();
    }, [
        company,
        department,
        params,
        getCompanyData,
        getDepartmentData,
        setLoading,
    ]);

    return (
        <AppLayout loading={loading}>
            {company && department && (
                <Box className={classes.container}>
                    <Header jobTitle={company.userPermission!.name} />
                    <Grid
                        container
                        spacing={3}
                        className={classes.contentContainer}
                    >
                        <Grid item xs={12} md={6}>
                            <Projects />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DepartmentDetails department={department} />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </AppLayout>
    );
};

export default DepartmentDashboard;
