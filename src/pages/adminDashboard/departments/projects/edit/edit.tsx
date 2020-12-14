import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { useForm } from 'react-hook-form';

import { ProjectModel, projectApi } from '../../../../../services';
import useProject from '../../../../../hooks/useProject';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';

import ProjectLayout from '../../../layout/projectLayout';
import BackButton from '../../../../../components/backButton';
import SubmitButton from '../../../../../components/mainButton';
import CropImageInput from '../../../../../components/cropImage/cropImageInput';
import useStyles from './styles';
import useCompany from '../../../../../hooks/useCompany';
import useDepartment from '../../../../../hooks/useDepartment';

const Edit: React.FC = () => {
    const classes = useStyles();
    const { register, errors, handleSubmit, formState, reset } = useForm();
    /*<ProjectModel>*/
    const { company } = useCompany();
    const { department } = useDepartment();
    const { project, updateProject } = useProject();
    const [image, setImage] = useState<File | undefined>();

    useEffect(() => {
        if (project) document.title = `${project.name} - Edição`;
    }, [project]);

    const formSubmit = async (data: ProjectModel) => {
        try {
            const response = await projectApi.update(
                company!.companyId,
                department!.departmentId,
                project!.projectId,
                data
            );
            updateProject(response.data);
            reset();
            snackbarUtils.success('Departamento editado com sucesso');
        } catch (error) {
            console.log(error);
            snackbarUtils.error(error.message);
        }
    };

    return (
        <ProjectLayout>
            <Paper className={classes.container}>
                <Grid container>
                    <Hidden mdDown>
                        <Grid item xs={1} md={4} />
                    </Hidden>
                    <Grid container item xs={12} md={4} justify="center">
                        <Typography variant="h1" className={classes.title}>
                            {project?.name} - Edição
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} md={4} justify="flex-end">
                        <BackButton message="Voltar" />
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={3}
                    className={classes.formContainer}
                    component="form"
                    onSubmit={handleSubmit(formSubmit)}
                >
                    <Grid item xs={12} md={2}>
                        <CropImageInput
                            image={image}
                            preview={project?.image}
                            setImage={setImage}
                            styles={classes.cropImage}
                        />
                    </Grid>
                    <Grid container item xs={12} md={6} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                data-cy="project-name"
                                name="name"
                                label="Nome"
                                error={errors.name !== undefined}
                                helperText={
                                    errors.name
                                        ? '⚠' + errors?.name?.message
                                        : ''
                                }
                                defaultValue={project?.name}
                                inputRef={register({
                                    required: 'Este campo é obrigatório',
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                data-cy="project-budget"
                                name="budget"
                                label="Orçamento"
                                error={errors.budget !== undefined}
                                helperText={
                                    errors.budget
                                        ? '⚠' + errors?.budget?.message
                                        : ''
                                }
                                defaultValue={project?.budget}
                                inputRef={register()}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                data-cy="project-initialDate"
                                type="date"
                                label="Data inicial"
                                name="initialDate"
                                error={errors.initialDate !== undefined}
                                helperText={
                                    errors.initialDate
                                        ? '⚠' + errors?.initialDate?.message
                                        : ''
                                }
                                defaultValue={
                                    project?.initialDate.split('T')[0]
                                }
                                inputRef={register({
                                    required: 'Este campo é obrigatório',
                                })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                data-cy="project-finalDate"
                                type="date"
                                label="Data Final"
                                name="finalDate"
                                error={errors.finalDate !== undefined}
                                helperText={
                                    errors.finalDate
                                        ? '⚠' + errors?.finalDate?.message
                                        : ''
                                }
                                defaultValue={project?.finalDate.split('T')[0]}
                                inputRef={register({
                                    required: 'Este campo é obrigatório',
                                })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            data-cy="project-description"
                            name="description"
                            label="Descrição"
                            error={errors.description !== undefined}
                            helperText={
                                errors.description
                                    ? '⚠' + errors?.description?.message
                                    : ''
                            }
                            multiline
                            rows={5}
                            defaultValue={project?.description}
                            inputRef={register()}
                        />
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        className={classes.submitButtonContainer}
                    >
                        <SubmitButton
                            type="submit"
                            text="Salvar alterações"
                            disabled={!formState.isDirty}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </ProjectLayout>
    );
};

export default Edit;
