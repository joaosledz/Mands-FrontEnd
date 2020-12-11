import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { DepartmentModel, departmentApi } from '../../../../../services';
import AppLayout from '../../../../../layout/appLayout';
import BackButton from '../../../../../components/backButton';
import SubmitButton from '../../../../../components/mainButton';
import IconSelection from '../../components/iconSelection/input';
import useStyles from './styles';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const NewDepartment: React.FC = () => {
    const classes = useStyles();
    const [image, setImage] = useState<string | undefined>('');
    const { register, errors, handleSubmit } = useForm<DepartmentModel>({});

    useEffect(() => {
        document.title = 'Cadastrar Departamento';
    }, []);

    // const handleSubmit = () => {
    //     const department = {
    //         image,
    //     };
    //     console.log(department);
    // };
    const onSubmit = (data: DepartmentModel) => {
        console.log(data);
        console.log(image);
        departmentApi
            .create(data)
            .then(response => {
                console.log(response);
                //sucess alert
            })
            .catch(error => {
                //error alert
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
                            Cadastrar Departamento
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} md={4} justify="flex-end">
                        <BackButton
                            message="Voltar para os departamentos"
                            redirect="admin/departamentos"
                        />
                    </Grid>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        spacing={3}
                        className={classes.formContainer}
                    >
                        <Grid item xs={12} md={2}>
                            <IconSelection setImage={setImage} />
                        </Grid>
                        <Grid container item xs={12} md={6} spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="name"
                                    fullWidth
                                    label="Nome"
                                    variant="outlined"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Gerente"
                                    value="Ana Tartari"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    name="email"
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
                                    })}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                name="objective"
                                fullWidth
                                multiline
                                rows={5}
                                variant="outlined"
                                label="Descrição"
                                inputRef={register({
                                    required: 'Esse campo é obrigatório',
                                })}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        xs={12}
                        justify="center"
                        className={classes.submitButtonContainer}
                    >
                        <SubmitButton text="Cadastrar" />
                    </Grid>
                </form>
            </Paper>
        </AppLayout>
    );
};

export default NewDepartment;
