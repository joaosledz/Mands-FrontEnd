import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import {
    TypeDepartment,
    departmentApi,
    projectApi,
    TypeMember,
    TypeProject,
    departmentPermApi,
    TypeDepartmentPermission,
} from '../../../../../services';
import useCompany from '../../../../../hooks/useCompany';
import useDepartment from '../../../../../hooks/useDepartment';
import handleEditURL from '../../../utils/handleURL';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';

import AdminLayout from '../../../layout/departmentLayout';
import FabButton from '../../../../../components/fabButton';
import IconSelectionInput from '../../components/iconSelection/input';
import Header from '../../components/header/header';
import AssignGridItem from '../../components/assignGridItem';
import useStyles from './styles';

import DefaultDepartmentIcon from '../../../../../assets/selectableIcons/defaultProject.svg';

type LocationProps = {
    department: TypeDepartment;
};

const Details: React.FC = () => {
    const classes = useStyles();
    const location = useLocation<LocationProps>();
    const history = useHistory();
    const { company } = useCompany();
    const { department } = useDepartment();

    const [loading, setLoading] = useState(true);

    const [members, setMembers] = useState<TypeMember[]>([]);
    const [projects, setProjects] = useState<TypeProject[]>([]);
    const [permissions, setPermissions] = useState<TypeDepartmentPermission>();

    useEffect(() => {
        const getPermissions = async () => {
            try {
                const { data } = await departmentPermApi.getUserPermissions(
                    department!.departmentId
                );
                setPermissions(data);
            } catch (err) {
                console.log(err);
            }
        };

        if (department) getPermissions();
    }, [department]);

    useEffect(() => {
        if (department) document.title = `Departamento - ${department.name}`;
    }, [department]);

    useEffect(() => {
        const getTeamAndProjectsData = async () => {
            try {
                if (company && department) {
                    const teamResponse = departmentApi.listEmployees(
                        company.companyId,
                        department.departmentId
                    );
                    const projectResponse = projectApi.findByDepartment(
                        department.departmentId
                    );

                    const [members, projects] = await Promise.all([
                        teamResponse,
                        projectResponse,
                    ]);

                    if (members) setMembers(members.data);
                    if (projects) setProjects(projects.data);
                }
            } catch (error) {
                snackbarUtils.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getTeamAndProjectsData();
    }, [company, department]);

    return (
        <AdminLayout>
            <Paper className={classes.container}>
                <Header departmentName={department?.name} page="details" />
                <Grid container spacing={3} className={classes.formContainer}>
                    <Grid item xs={12} md={2}>
                        <IconSelectionInput
                            image={
                                department?.image
                                    ? department?.image
                                    : {
                                          path: DefaultDepartmentIcon,
                                          imageId: 0,
                                      }
                            }
                            disabled
                        />
                    </Grid>
                    <Grid container item xs={12} md={4} spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                label="Nome"
                                value={department?.name || ''}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                label="Email"
                                value={department?.email || ''}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className={classes.textField}
                            />
                        </Grid>
                    </Grid>
                    <Grid spacing={3} container item xs={12} md={6}>
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                multiline
                                rows={6}
                                label="Descrição"
                                value={department?.objective || ''}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className={classes.textField}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    className={classes.assignsContainer}
                    justify="space-around"
                    spacing={3}
                >
                    {(permissions?.deleteUser ||
                        company?.userPermission?.department) && (
                        <AssignGridItem
                            title="Equipe:"
                            category="team"
                            description="Gerencie os funcionários deste departamento pelo botão no canto superior direito."
                            teamData={members}
                            icon="team"
                            actionIcon="add"
                            loading={loading}
                        />
                    )}

                    {(permissions?.project ||
                        company?.userPermission?.department) && (
                        <AssignGridItem
                            title="Projetos:"
                            category="project"
                            description="Gerencie os projetos deste departamento pelo botão no
                        canto superior direito."
                            projectData={projects}
                            icon="document"
                            actionIcon="add"
                            loading={loading}
                            styles={classes.projectAssignGridItem}
                        />
                    )}
                </Grid>
                {permissions?.editDepartment && (
                    <FabButton
                        title="Configurar"
                        icon="settings"
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
                )}
            </Paper>
        </AdminLayout>
    );
};

export default Details;
