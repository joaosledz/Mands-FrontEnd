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
import useCompany from '../../../../../hooks/useCompany';
import departmentAnimation from '../../../../../assets/animations/department.json';
import { useParams } from 'react-router-dom';
import TypeParams from '../../../../../models/params';
import Lottie from 'lottie-react';

const NewDepartment: React.FC = () => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const [image, setImage] = useState<string | undefined>('');
    const { register, errors, handleSubmit } = useForm<DepartmentModel>({});
    const { company } = useCompany();

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
            .create(company!.companyId, data)
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
                            redirect={`admin/${params.company}/departamentos`}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} md={12}>
                    <Grid item xs={12} md={8} spacing={1}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid
                                container
                                spacing={3}
                                className={classes.formContainer}
                            >
                                <Grid item xs={12} md={3}>
                                    <IconSelection setImage={setImage} />
                                </Grid>

                                <Grid container item xs={12} md={9}>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            className={classes.textFieldGrid}
                                            name="name"
                                            fullWidth
                                            label="Nome"
                                            variant="outlined"
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="name"
                                            render={({ message }) => (
                                                <Typography
                                                    className={
                                                        classes.ErrorMessage
                                                    }
                                                >
                                                    {message}
                                                </Typography>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            className={classes.textFieldGrid}
                                            name="email"
                                            fullWidth
                                            label="Email"
                                            variant="outlined"
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                                pattern: {
                                                    // eslint-disable-next-line
                                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message:
                                                        'Deve seguir o formato nome@email.com',
                                                },
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="email"
                                            render={({ message }) => (
                                                <Typography
                                                    className={
                                                        classes.ErrorMessage
                                                    }
                                                >
                                                    {message}
                                                </Typography>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            className={classes.textFieldGrid}
                                            name="phone"
                                            fullWidth
                                            label="Telefone"
                                            variant="outlined"
                                            inputRef={register({})}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="phone"
                                            render={({ message }) => (
                                                <Typography
                                                    className={
                                                        classes.ErrorMessage
                                                    }
                                                >
                                                    {message}
                                                </Typography>
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextField
                                        name="objective"
                                        fullWidth
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        label="Descrição"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="objective"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
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
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Lottie animationData={departmentAnimation} />
                    </Grid>
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default NewDepartment;
