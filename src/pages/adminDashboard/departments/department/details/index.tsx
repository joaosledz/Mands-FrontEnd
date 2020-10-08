import React, { useEffect, useState } from 'react';
import { useLocation, RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import DepartmentAllProps, {
    ApiProps as DepartmentProps,
} from '../../../../../models/department';
import departments from '../../../../../utils/data/departments';

import AppLayout from '../../../../../layout/appLayout';
import FabButton from '../../../../../components/fabButton';
import IconSelectionInput from '../../components/iconSelection/input';
import Header from '../../components/header/header';
import AssignGridItem from '../../components/assignGridItem';
import useStyles from './styles';

type LocationProps = {
    props: DepartmentAllProps;
};

const Details: React.FC<RouteComponentProps> = ({ history }) => {
    const classes = useStyles();
    const location = useLocation<LocationProps>();

    const handleDepartmentData = () => {
        return location.state?.props.department
            ? location.state.props.department
            : departments[0];
    };

    const handleEditURL = () => {
        const baseURL = location.pathname.split('/detalhes/');
        const url = `${baseURL[0]}/edicao/${baseURL[1]}`;
        return url;
    };

    const [department] = useState<DepartmentProps>(handleDepartmentData());

    useEffect(() => {
        document.title = `${department.name} - Detalhes`;
    }, [department.name]);

    return (
        <AppLayout>
            <Paper className={classes.container}>
                <Header departmentName={department.name} redirect />
                <Grid container spacing={3} className={classes.formContainer}>
                    <Grid item xs={12} md={2}>
                        <IconSelectionInput image={department.icon} disabled />
                    </Grid>
                    <Grid container item xs={12} md={6} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                disabled
                                label="Nome"
                                value={department.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                disabled
                                label="Gerente"
                                value="Ana Tartari"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                disabled
                                label="Email"
                                value={department.email}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            disabled
                            fullWidth
                            multiline
                            rows={6}
                            variant="outlined"
                            label="Descrição"
                            value={department.description}
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
                        teamData={department.team}
                        icon="team"
                        disabled
                        actionIcon="manage"
                    />
                    <AssignGridItem
                        title="Projetos:"
                        category="project"
                        description="Gerencie os projetos deste departamento pelo botão no
                        canto superior direito."
                        projectData={department.projects}
                        icon="document"
                        actionIcon="manage"
                        disabled
                        styles={classes.projectAssignGridItem}
                    />
                </Grid>
                <FabButton
                    title="Editar"
                    icon="edit"
                    onClick={() => history.push(handleEditURL(), department)}
                />
            </Paper>
        </AppLayout>
    );
};

export default Details;
