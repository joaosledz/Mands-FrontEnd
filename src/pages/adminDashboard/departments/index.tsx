import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import AppLayout from '../../../layout/appLayout';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import DepartmentsContent from '../../../components/departments';
import FabButton from '../../../components/fabButton';
import useStyles from './styles';

// import { Container } from './styles';

const Departments: React.FC = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Admin - Departamentos';
    }, []);

    return (
        <AppLayout>
            <Box className={classes.container}>
                <Header name="Departamentos" />
                <Grid container spacing={6}>
                    <Grid item xs={1} md={1} lg={2} xl={2}>
                        <SideBar />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={12}
                        lg={9}
                        className={classes.departmentsContainer}
                    >
                        <DepartmentsContent
                            title="Selecione um departamento:"
                            containerStyles={
                                classes.departmentsContentContainer
                            }
                            breakpoints={{ xs: 12, md: 4 }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <FabButton />
        </AppLayout>
    );
};

export default Departments;
