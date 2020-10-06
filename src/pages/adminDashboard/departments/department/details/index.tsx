import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import TypeParams from '../../../../../models/params';
import DepartmentAllProps, {
    ApiProps as DepartmentProps,
} from '../../../../../components/departments/models/department';
import departments from '../../../../../utils/data/departments';

import AppLayout from '../../../../../layout/appLayout';
import BackButton from '../../../../../components/backButton';
import IconSelectionInput from '../../components/iconSelection/input';
import AssignGridItem from '../../components/assignGridItem';
import useStyles from './styles';

type LocationProps = {
    props: DepartmentAllProps;
};

const Details: React.FC = () => {
    const classes = useStyles();
    const location = useLocation<LocationProps>();
    const params = useParams<TypeParams>();

    const handleDepartmentData = () => {
        return location.state?.props.department
            ? location.state.props.department
            : departments[0];
    };

    const [department] = useState<DepartmentProps>(handleDepartmentData());

    useEffect(() => {
        document.title = `${department.name} - Mands`;
    }, [department.name]);

    return (
        <AppLayout>
            <Paper className={classes.container}>
                <Grid container spacing={3}>
                    <Grid container item xs={12} md={4} justify="flex-start">
                        <BackButton
                            message="Voltar para os departamentos"
                            redirect={`admin/${params.company}/departamentos`}
                        />
                    </Grid>
                    <Grid container item xs={12} md={4} justify="center">
                        <Typography variant="h1" className={classes.title}>
                            Departamento - {department.name}
                        </Typography>
                    </Grid>
                    <Hidden mdDown>
                        <Grid item xs={1} md={4} />
                    </Hidden>
                </Grid>
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
                        type="team"
                        description="Gerencie os funcionários deste departamento pelo botão no canto superior direito."
                        teamData={department.team}
                        icon="team"
                        actionIcon="add"
                    />
                    <AssignGridItem
                        title="Projetos:"
                        type="project"
                        description="Gerencie os projetos deste departamento pelo botão no
                        canto superior direito."
                        projectData={department.projects}
                        icon="document"
                        actionIcon="manage"
                        styles={classes.projectAssignGridItem}
                    />
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default Details;
