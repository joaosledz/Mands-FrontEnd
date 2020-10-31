import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import departmentsData from '../../../utils/data/departments';

import Layout from '../layout/layout';
import DepartmentsContent from './components/departments/departments';
import FabButton from '../../../components/fabButton';
import useStyles from './styles';

const Departments: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        document.title = 'Admin - Departamentos';
    }, []);

    return (
        <Layout title="Departamentos">
            <Grid
                item
                xs={12}
                md={12}
                lg={9}
                className={classes.departmentsContainer}
            >
                <DepartmentsContent
                    departments={departmentsData}
                    containerStyles={classes.departmentsContentContainer}
                />
            </Grid>
            <FabButton
                onClick={() => history.push('departamentos/cadastrar')}
            />
        </Layout>
    );
};

export default Departments;
