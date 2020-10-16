import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import { TypeProjects } from '../../../../../models/department';
import handleEditURL from '../../utils/handleURL';

import AppLayout from '../../../../../layout/appLayout';
import FabButton from '../../../../../components/fabButton';
import BackButton from '../../../../../components/backButton';
import CropImageInput from '../../../../../components/cropImage/cropImageInput';
import useStyles from './styles';

type LocationParams = {
    project: TypeProjects;
};

const RegisterProject: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation<LocationParams>();

    const [project, setProject] = useState<TypeProjects>();

    useEffect(() => {
        const handleLocationData = () => {
            if (!location.state || !location.state.project)
                history.push('/escolha-da-empresa');
            else {
                const project = location.state.project;
                document.title = `Projeto - ${project.name}`;
                setProject(project);
            }
        };
        handleLocationData();
        // eslint-disable-next-line
    }, []);

    return (
        <AppLayout>
            <Paper className={classes.container}>
                <Grid container>
                    <Hidden mdDown>
                        <Grid item xs={1} md={4} />
                    </Hidden>
                    <Grid container item xs={12} md={4} justify="center">
                        <Typography variant="h1" className={classes.title}>
                            {project?.name} - Detalhes
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} md={4} justify="flex-end">
                        <BackButton message="Voltar" />
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.formContainer}>
                    <Grid item xs={12} md={2}>
                        <CropImageInput
                            image={undefined}
                            preview={project?.icon}
                            disabled
                            styles={classes.cropImage}
                        />
                    </Grid>
                    <Grid container item xs={12} md={6} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                disabled
                                label="Nome"
                                variant="outlined"
                                value={project?.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                disabled
                                variant="outlined"
                                label="Orçamento"
                                value={project?.budget}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                type="date"
                                fullWidth
                                label="Data inicial"
                                value={project?.initialDate}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                type="date"
                                fullWidth
                                label="Data Final"
                                value={project?.finalDate}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            disabled
                            fullWidth
                            multiline
                            rows={5}
                            variant="outlined"
                            label="Descrição"
                            value={project?.description}
                        />
                    </Grid>
                </Grid>
            </Paper>
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
                        project
                    )
                }
            />
        </AppLayout>
    );
};

export default RegisterProject;
