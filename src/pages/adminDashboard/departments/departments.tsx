import React, { useEffect /* , useContext */ } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import useCompany from '../../../hooks/useCompany';
import Layout from '../layout/layout';
import DepartmentsContent from './components/departments/departments';
import FabButton from '../../../components/fabButton';
import useStyles from './styles';

const Departments: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const { company } = useCompany();

    useEffect(() => {
        if (company) document.title = `Admin/${company.username}/departamentos`;
        else document.title = `Admin/departamentos`;
    }, [company]);

    return (
        <Layout title="Departamentos" menu>
            <Grid item xs={12} lg={9} className={classes.departmentsContainer}>
                {company && (
                    <React.Fragment>
                        <DepartmentsContent
                            departments={company.departments!}
                            containerStyles={
                                classes.departmentsContentContainer
                            }
                        />
                    </React.Fragment>
                )}
            </Grid>
            <FabButton
                onClick={() => history.push('departamentos/cadastrar')}
            />
        </Layout>
    );
};

export default Departments;
