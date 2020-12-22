import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import TypeParams from '../../../../../models/params';
import { TypeProject } from '../../../../../services';
import handleEditURL from '../../utils/handleURL';
import useProject from '../../../../../hooks/useProject';

import ProjectLayout from '../../../layout/projectLayout';
import FabButton from '../../../../../components/fabButton';
import BackButton from '../../../../../components/backButton';
import CropImageInput from '../../../../../components/cropImage/cropImageInput';
import useStyles from './styles';

type TypeLocation = {
    project: TypeProject;
};

const RegisterProject: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams<TypeParams>();
    const location = useLocation<TypeLocation>();
    const { project } = useProject();

    useEffect(() => {
        if (project) document.title = `${project.name}`;
    }, [project]);

    return (
        <ProjectLayout>
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
                        <BackButton
                            message="Voltar"
                            redirect={`admin/${params.company}/departamentos/${params.department}/detalhes`}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.formContainer}>
                    <Grid item xs={12} md={2}>
                        <CropImageInput
                            image={undefined}
                            preview={project?.image}
                            disabled
                            styles={classes.cropImage}
                        />
                    </Grid>
                    <Grid container item xs={12} md={6} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                label="Nome"
                                value={project?.name}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                label="Orçamento"
                                value={project?.budget}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                type="date"
                                label="Data inicial"
                                value={project?.initialDate.split('T')[0]}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                type="date"
                                label="Data Final"
                                value={project?.finalDate.split('T')[0]}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            disabled
                            multiline
                            rows={5}
                            label="Descrição"
                            value={project?.description}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </Paper>
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
                        project
                    )
                }
            />
        </ProjectLayout>
    );
};

export default RegisterProject;
