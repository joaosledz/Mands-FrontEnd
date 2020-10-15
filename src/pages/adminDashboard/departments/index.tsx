import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import AppLayout from '../../../layout/appLayout';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import DepartmentsContent from './components/departments/departments';
import FabButton from '../../../components/fabButton';

// import TypeParams from '../../../models/params';

import departmentsData from '../../../utils/data/departments';
import useStyles from './styles';

const Departments: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        document.title = 'Admin - Departamentos';
    }, []);

    return (
        <AppLayout>
            <Box className={classes.container}>
                <Header name="Departamentos" />
                <Grid container spacing={3}>
                    <Grid item lg={2}>
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
                            departments={departmentsData}
                            containerStyles={
                                classes.departmentsContentContainer
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
            <FabButton
                onClick={() => history.push('departamentos/cadastrar')}
            />
        </AppLayout>
    );
};

export default Departments;
