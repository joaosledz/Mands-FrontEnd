import React, { useEffect /* , useContext */ } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Context from '../layout/contexts/company';
import Layout from '../layout/layout';
import DepartmentsContent from './components/departments/departments';
import FabButton from '../../../components/fabButton';
import useStyles from './styles';

const Departments: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        document.title = 'Admin/Departamentos';
    }, []);

    return (
        <Layout title="Departamentos">
            <Grid item xs={12} lg={9} className={classes.departmentsContainer}>
                <Context.Consumer>
                    {context =>
                        context.company && (
                            <React.Fragment>
                                <DepartmentsContent
                                    departments={context.company.departments!}
                                    containerStyles={
                                        classes.departmentsContentContainer
                                    }
                                />
                            </React.Fragment>
                        )
                    }
                </Context.Consumer>
            </Grid>
            <FabButton
                onClick={() => history.push('departamentos/cadastrar')}
            />
        </Layout>
    );
};

export default Departments;
