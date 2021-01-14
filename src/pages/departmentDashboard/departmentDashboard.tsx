import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import TypeParams from '../../models/params';
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
    const { department, getDepartmentData, loading } = useDepartment();

    useEffect(() => {
        if (department) document.title = `Departamento - ${department.name}`;
        else document.title = 'Carregando...';
    }, [department]);

    useEffect(() => {
        const checkDepartmentData = async () => {
            if (params.department) {
                try {
                    if (!department)
                        await getDepartmentData(
                            params.company,
                            params.department
                        );
                } catch (error) {
                    snackbarUtils.error(error.message);
                }
            }
        };
        checkDepartmentData();
        // eslint-disable-next-line
    }, []);

    return (
        <AppLayout loading={loading}>
            {department && (
                <Box className={classes.container}>
                    <Header jobTitle={'Gerente'} />
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
