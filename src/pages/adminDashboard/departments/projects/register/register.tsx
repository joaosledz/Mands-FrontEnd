import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';

import Backdrop from '../../../../../components/backdrop';
import AppLayout from '../../../../../layout/appLayout';
import BackButton from '../../../../../components/backButton';
import SubmitButton from '../../../../../components/mainButton';
import CropImageInput from '../../../../../components/cropImage/cropImageInput';
import useStyles from './styles';

import { ProjectModel } from '../../../../../services';

import useCompany from '../../../../../hooks/useCompany';
import useDepartment from '../../../../../hooks/useDepartment';
import useProject from '../../../../../hooks/useProject';

type TypeErrors = {
    name?: string;
    budget?: string;
    initialDate?: string;
    finalDate?: string;
    description?: string;
};

const NewProject: React.FC = () => {
    const classes = useStyles();
    const [image, setImage] = useState<File | undefined>();
    const history = useHistory();
    const { company } = useCompany();
    const { department } = useDepartment();
    const { createProject, loading } = useProject();
    const [formValues, setFormValues] = useState<ProjectModel>({
        project: {
            budget: 0,
            description: '',
            finalDate: '',
            initialDate: '',
            name: '',
        },
        associations: [],
    });
    const [errors, setErrors] = useState<TypeErrors | undefined>();

    useEffect(() => {
        document.title = 'Cadastrar Projeto';
    }, []);

    const handleSubmit = async () => {
        try {
            if (department && company) {
                if (!handleErrors()) return;

                const data: ProjectModel = {
                    ...formValues,
                    project: {
                        ...formValues.project,
                        initialDate: dateToIso(formValues.project.initialDate),
                        finalDate: dateToIso(formValues.project.finalDate),
                    },
                };

                await createProject(
                    data,
                    company.companyId,
                    department.departmentId,
                    image
                );

                history.goBack();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handlechange = (key: string, value: string | number) => {
        setFormValues({
            ...formValues,
            project: { ...formValues.project, [key]: value },
        });
    };

    const isEmpty = (value: string): boolean => {
        //@ts-ignore
        if (value.length === 0 || value.trim === '') return true;
        else return false;
    };

    const handleErrors = (): boolean => {
        setErrors(undefined);
        const errorTypes = {
            mustBeFilled: 'Precisa ser preenchido',
        };
        let mErrors: TypeErrors = {};

        if (isEmpty(formValues.project.name))
            mErrors.name = errorTypes.mustBeFilled;
        if (isEmpty(formValues.project.description))
            mErrors.description = errorTypes.mustBeFilled;
        if (isEmpty(formValues.project.initialDate))
            mErrors.initialDate = errorTypes.mustBeFilled;
        if (isEmpty(formValues.project.finalDate))
            mErrors.finalDate = errorTypes.mustBeFilled;

        if (Object.keys(mErrors).length === 0) return true;

        setErrors(mErrors);
        return false;
    };

    const dateToIso = (date: string): string => {
        const splitedDate: Array<string> = date.split('-');

        const numberArray = splitedDate.map(value => parseInt(value));

        const newDate = new Date(
            numberArray[0],
            numberArray[1] - 1,
            numberArray[2]
        );

        return newDate.toISOString();
    };

    return (
        <AppLayout>
            <Backdrop loading={loading} />
            <Paper className={classes.container}>
                <Grid container>
                    <Hidden mdDown>
                        <Grid item xs={1} md={4} />
                    </Hidden>
                    <Grid container item xs={12} md={4} justify="center">
                        <Typography variant="h1" className={classes.title}>
                            Cadastrar Projeto
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
                            setImage={setImage}
                            styles={classes.cropImage}
                        />
                    </Grid>
                    <Grid container item xs={12} md={6} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nome"
                                value={formValues.project.name}
                                onChange={e =>
                                    handlechange('name', e.target.value)
                                }
                                error={errors?.name ? true : false}
                                helperText={errors?.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Orçamento"
                                value={formValues.project.budget}
                                onChange={e =>
                                    handlechange('budget', e.target.value)
                                }
                                type="number"
                                error={errors?.budget ? true : false}
                                helperText={errors?.budget}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                type="date"
                                label="Data inicial"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formValues.project.initialDate}
                                onChange={e =>
                                    handlechange('initialDate', e.target.value)
                                }
                                error={errors?.initialDate ? true : false}
                                helperText={errors?.initialDate}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                type="date"
                                label="Data Final"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formValues.project.finalDate}
                                onChange={e =>
                                    handlechange('finalDate', e.target.value)
                                }
                                error={errors?.finalDate ? true : false}
                                helperText={errors?.finalDate}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            multiline
                            rows={5}
                            label="Descrição"
                            value={formValues.project.description}
                            onChange={e =>
                                handlechange('description', e.target.value)
                            }
                            error={errors?.description ? true : false}
                            helperText={errors?.description}
                        />
                    </Grid>
                </Grid>
                {/* <Grid
                    container
                    className={classes.assignsContainer}
                    justify="space-around"
                    spacing={3}
                >
                </Grid> */}
                <Grid
                    container
                    xs={12}
                    justify="center"
                    className={classes.submitButtonContainer}
                >
                    <SubmitButton text="Cadastrar" onClick={handleSubmit} />
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default NewProject;
