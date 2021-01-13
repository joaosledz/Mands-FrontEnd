import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';

import { ProjectModel, projectApi } from '../../../../../services';
import useCompany from '../../../../../hooks/useCompany';
import useDepartment from '../../../../../hooks/useDepartment';
import useProject from '../../../../../hooks/useProject';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';

import ProjectLayout from '../../../layout/projectLayout';
import BackButton from '../../../../../components/backButton';
import SubmitButton from '../../../../../components/mainButton';
import CropImageInput from '../../../../../components/cropImage/cropImageInput';
import DeleteModal from '../../../components/deleteModal/project';
import useStyles from './styles';

const Edit: React.FC = () => {
    const classes = useStyles();
    const { register, errors, handleSubmit, formState, reset } = useForm();
    /*<ProjectModel>*/
    const { company } = useCompany();
    const { department } = useDepartment();
    const { project, updateProject } = useProject();

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
                    <Hidden only="xs">
                        <Grid item xs={1} sm={4} />
                    </Hidden>

                    <Grid container item xs={12} sm={4} justify="center">
                        <Typography variant="h1" className={classes.title}>
                            Projeto - {project?.name}
                        </Typography>
                    </Grid>

                    <Hidden only="xs">
                        <Grid container item xs={12} sm={4} justify="flex-end">
                            <BackButton message="Voltar" />
                        </Grid>
                    </Hidden>
                </Grid>

                <Grid
                    container
                    spacing={3}
                    className={classes.formContainer}
                    component="form"
                    onSubmit={handleSubmit(formSubmit)}
                >
                    <Grid container item xs={12} md={7} spacing={3}>
                        <Grid item xs={12} md={4}>
                            <CropImageInput
                                image={image}
                                preview={project?.image}
                                setImage={setImage}
                                styles={classes.cropImage}
                            />
                        </Grid>

                        <Grid container item xs={12} md={8} spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    label="Nome"
                                    error={errors.name !== undefined}
                                    helperText={
                                        errors.name
                                            ? '⚠' + errors?.name?.message
                                            : ''
                                    }
                                    defaultValue={project?.name}
                                    inputProps={{
                                        'data-cy': 'project-name',
                                    }}
                                    inputRef={register({
                                        required: 'Este campo é obrigatório',
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="budget"
                                    label="Orçamento"
                                    error={errors.budget !== undefined}
                                    helperText={
                                        errors.budget
                                            ? '⚠' + errors?.budget?.message
                                            : ''
                                    }
                                    defaultValue={project?.budget}
                                    inputProps={{
                                        'data-cy': 'project-budget',
                                    }}
                                    inputRef={register()}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
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
                                    inputProps={{
                                        'data-cy': 'project-initialDate',
                                    }}
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
                                    type="date"
                                    label="Data Final"
                                    name="finalDate"
                                    error={errors.finalDate !== undefined}
                                    helperText={
                                        errors.finalDate
                                            ? '⚠' + errors?.finalDate?.message
                                            : ''
                                    }
                                    defaultValue={
                                        project?.finalDate.split('T')[0]
                                    }
                                    inputProps={{
                                        'data-cy': 'project-finalDate',
                                    }}
                                    inputRef={register({
                                        required: 'Este campo é obrigatório',
                                    })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
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
                                    inputProps={{
                                        'data-cy': 'project-description',
                                    }}
                                    inputRef={register()}
                                />
                            </Grid>
                        </Grid>

                        <Grid container justify="center">
                            <SubmitButton
                                type="submit"
                                text="Salvar alterações"
                                disabled={!formState.isDirty}
                                mt={20}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} md={5}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-end"
                            className={classes.rightSide}
                        >
                            <Grid container component={Typography} variant="h2">
                                Área Perigosa
                            </Grid>
                            <Grid id="danger-zone-container" container>
                                <Grid
                                    container
                                    component={Typography}
                                    variant="h3"
                                >
                                    Deletar projeto
                                </Grid>
                                <Grid container component={Typography}>
                                    Uma vez deletado este projeto, não tem
                                    volta. Por favor, tenha certeza.
                                </Grid>
                                <Grid
                                    data-cy="delete-modal-button"
                                    container
                                    item
                                    xs={12}
                                    md={6}
                                    component={Button}
                                    variant="outlined"
                                    onClick={() =>
                                        setOpenDeleteModal(!openDeleteModal)
                                    }
                                >
                                    Deletar este projeto
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {company && department && project && (
                <DeleteModal
                    isOpen={openDeleteModal}
                    setIsOpen={setOpenDeleteModal}
                    company={company}
                    department={department}
                    project={project}
                />
            )}
        </ProjectLayout>
    );
};

export default Edit;
