import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import {
    TypeDepartment,
    departmentApi,
    projectApi,
} from '../../../../../services';
import useCompany from '../../../../../hooks/useCompany';
import useDepartment from '../../../../../hooks/useDepartment';
import handleEditURL from '../../utils/handleURL';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';

import AdminLayout from '../../../layout/departmentLayout';
import FabButton from '../../../../../components/fabButton';
import IconSelectionInput from '../../components/iconSelection/input';
import Header from '../../components/header/header';
import AssignGridItem from '../../components/assignGridItem';
import useStyles from './styles';

type LocationProps = {
    department: TypeDepartment;
};

const Details: React.FC = () => {
    const classes = useStyles();
    const location = useLocation<LocationProps>();
    const history = useHistory();
    const { company } = useCompany();
    const { department, updateDepartment } = useDepartment();

    useEffect(() => {
        const getProjectsData = async () => {
            console.log('projetos');
            try {
                if (company && department) {
                    const response = await projectApi.findByDepartment(
                        company.username,
                        department.name
                    );
                    const data: TypeDepartment = {
                        ...department,
                        projects: [...response.data],
                    };
                    updateDepartment(data);
                }
            } catch (error) {
                snackbarUtils.error(error.message);
            }
        };

        const getEmployeesData = async () => {
            console.log('funcionários');
            try {
                if (company && department) {
                    const response = await departmentApi.listEmployees(
                        company.companyId,
                        department.departmentId
                    );
                    const data: TypeDepartment = {
                        ...department,
                        members: [...response.data],
                    };
                    updateDepartment(data);
                }
            } catch (error) {
                snackbarUtils.error(error.message);
            }
        };

        const getTeamAndProjectsData = async () => {
            console.log('os dois vazios');
            try {
                if (company && department) {
                    const teamResponse = await departmentApi.listEmployees(
                        company.companyId,
                        department.departmentId
                    );
                    const projectResponse = await projectApi.findByDepartment(
                        company.username,
                        department.name
                    );
                    const data: TypeDepartment = {
                        ...department,
                        projects: [...projectResponse.data],
                        members: [...teamResponse.data],
                    };
                    updateDepartment(data);
                }
            } catch (error) {
                snackbarUtils.error(error.message);
            }
        };

        const checkData = async () => {
            if (department) {
                document.title = `Departamento - ${department.name}`;
                const teamIsEmpty = department.members.length === 0;
                const projectIsEmpty =
                    department.projects?.length === 0 || !department.projects;
                if (teamIsEmpty && projectIsEmpty)
                    await getTeamAndProjectsData();
                else if (teamIsEmpty) await getEmployeesData();
                else if (!department.projects || projectIsEmpty)
                    await getProjectsData();
                else return;
            }
        };
        checkData();
        // eslint-disable-next-line
    }, []);

    return (
        <AdminLayout>
            <Paper className={classes.container}>
                <Header departmentName={department?.name} page="details" />
                <Grid container spacing={3} className={classes.formContainer}>
                    <Grid item xs={12} md={2}>
                        <IconSelectionInput
                            image={department?.image}
                            disabled
                        />
                    </Grid>
                    <Grid container item xs={12} md={4} spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                disabled
                                label="Nome"
                                value={department?.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                label="Email"
                                value={department?.email}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            disabled
                            multiline
                            rows={6}
                            label="Descrição"
                            value={department?.objective}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    className={classes.assignsContainer}
                    justify="space-around"
                    spacing={3}
                >
                    <AssignGridItem
                        title="Equipe:"
                        category="team"
                        description="Gerencie os funcionários deste departamento pelo botão no canto superior direito."
                        teamData={department?.members}
                        icon="team"
                        actionIcon="manage"
                    />
                    <AssignGridItem
                        title="Projetos:"
                        category="project"
                        description="Gerencie os projetos deste departamento pelo botão no
                        canto superior direito."
                        projectData={department?.projects}
                        icon="document"
                        actionIcon="add"
                        styles={classes.projectAssignGridItem}
                    />
                </Grid>
                <FabButton
                    title="Editar"
                    icon="edit"
                    onClick={() =>
                        history.push(
                            handleEditURL(
                                location.pathname,
                                '/detalhes',
                                '/edicao'
                            ),
                            department
                        )
                    }
                />
            </Paper>
        </AdminLayout>
    );
};

export default Details;
