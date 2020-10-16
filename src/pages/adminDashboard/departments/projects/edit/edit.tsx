import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import { TypeProjects } from '../../../../../models/department';
import departmentsData from '../../../../../utils/data/departments';

import AppLayout from '../../../../../layout/appLayout';
import BackButton from '../../../../../components/backButton';
import SubmitButton from '../../../../../components/mainButton';
import CropImageInput from '../../../../../components/cropImage/cropImageInput';
import useStyles from './styles';

const Edit: React.FC = () => {
    const classes = useStyles();
    const location = useLocation<TypeProjects>();

    const handleProjectData = () => {
        console.log(location);
        return location.state ? location.state : departmentsData[0].projects[0];
    };

    const projectState = handleProjectData();
    const [project, setProject] = useState<TypeProjects>(projectState);
    const [projectChanged, setProjectChanged] = useState<boolean>(false);
    const [image, setImage] = useState<File | undefined>();

    useEffect(() => {
        document.title = `${projectState.name} - Edição`;
    }, [projectState.name]);

    useEffect(() => {
        const checkProjectChanged = () => {
            if (JSON.stringify(projectState) !== JSON.stringify(project))
                setProjectChanged(true);
            else if (image) {
                if (projectState.icon !== URL.createObjectURL!(image))
                    setProjectChanged(true);
                else setProjectChanged(false);
            } else setProjectChanged(false);
        };
        checkProjectChanged();
    }, [project, projectState, image]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: string
    ) => {
        console.log(event.target.value);
        setProject({
            ...project,
            [key]: event.target.value,
        });
    };

    return (
        <AppLayout>
            <Paper className={classes.container}>
                <Grid container>
                    <Hidden mdDown>
                        <Grid item xs={1} md={4} />
                    </Hidden>
                    <Grid container item xs={12} md={4} justify="center">
                        <Typography variant="h1" className={classes.title}>
                            {projectState.name} - Edição
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} md={4} justify="flex-end">
                        <BackButton message="Voltar" />
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={classes.formContainer}>
                    <Grid item xs={12} md={2}>
                        <CropImageInput
                            image={image}
                            preview={project.icon}
                            setImage={setImage}
                            styles={classes.cropImage}
                        />
                    </Grid>
                    <Grid container item xs={12} md={6} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Nome"
                                value={project.name}
                                onChange={event => handleChange(event, 'name')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Orçamento"
                                value={project.budget}
                                onChange={event =>
                                    handleChange(event, 'budget')
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                type="date"
                                fullWidth
                                label="Data inicial"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={project.initialDate}
                                onChange={event =>
                                    handleChange(event, 'initialDate')
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                type="date"
                                fullWidth
                                label="Data Final"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={project.finalDate}
                                onChange={event =>
                                    handleChange(event, 'finalDate')
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            variant="outlined"
                            label="Descrição"
                            value={project.description}
                            onChange={event =>
                                handleChange(event, 'description')
                            }
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="center"
                    className={classes.submitButtonContainer}
                >
                    <SubmitButton
                        text="Salvar alterações"
                        disabled={!projectChanged}
                        onClick={() => console.log(!projectChanged)}
                    />
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default Edit;
