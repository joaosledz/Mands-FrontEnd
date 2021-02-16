import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import employeesData from '../../../utils/data/employeesComplete';
import TableEmployees from './components/table/employees';
import Layout from '../layout/departmentLayout';
import FabButton from '../../../components/fabButton';
import useStyles from './styles';

const Departments: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        document.title = 'Admin - Departamentos';
    }, []);

    return (
        <Layout title="Departamentos" menu>
            <Grid item xs={12} lg={9} className={classes.departmentsContainer}>
                <TableEmployees data={employeesData} />
            </Grid>
            <FabButton
                onClick={() => history.push('departamentos/cadastrar')}
            />
        </Layout>
    );
};

export default Departments;
