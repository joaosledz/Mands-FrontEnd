import React, { useEffect /* , useContext */ } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import useCompany from '../../../hooks/useCompany';
import { departmentApi } from '../../../services';
import snackbarUtils from '../../../utils/functions/snackbarUtils';

import Layout from '../layout/departmentLayout';
import DepartmentsContent from './components/departments/departments';
import FabButton from '../../../components/fabButton';
import useStyles from './styles';

const Departments: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const { company, updateCompany, setLoading } = useCompany();

    useEffect(() => {
        const fetchDepartments = async () => {
            if (company) {
                setLoading(true);
                try {
                    const response = await departmentApi.listByCompany(
                        company.companyId
                    );
                    updateCompany({
                        ...company,
                        departments: [...response.data],
                    });
                } catch (error) {
                    snackbarUtils.error(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchDepartments();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (company) {
            document.title = `Admin/${company.username}/departamentos`;
        } else document.title = `Admin/departamentos`;
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
