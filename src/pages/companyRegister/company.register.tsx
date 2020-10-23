import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';

import AppLayout from '../../layout/appLayout';
import BackButton from '../../components/backButton';
import CropImageInput from '../../components/cropImage/cropImageInput';
import SubmitButton from '../../components/mainButton';
import useStyles from './styles';

const CompanyRegister: React.FC = () => {
    const classes = useStyles();

    const [image, setImage] = useState<File | undefined>(undefined);

    // const { register, errors, handleSubmit } = useForm<RegisterInput>();

    useEffect(() => {
        document.title = 'Cadastrar Empresa';
    }, []);

    return (
        <AppLayout>
            <Paper elevation={3} className={classes.paper}>
                <Grid
                    component="form"
                    container
                    // onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container className={classes.header}>
                        <Grid item xs={12} sm={9} md={6}>
                            <Typography variant="h1" color="primary">
                                Cadastrar uma empresa:
                            </Typography>
                        </Grid>
                        <Hidden only="xs">
                            <Grid
                                container
                                item
                                sm={3}
                                md={6}
                                justify="flex-end"
                            >
                                <BackButton
                                    message="Voltar"
                                    redirect="escolha-da-empresa"
                                />
                            </Grid>
                        </Hidden>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        className={classes.formContent}
                    >
                        <Grid
                            container
                            item
                            spacing={3}
                            xs={12}
                            md={9}
                            style={{ marginTop: 20 }}
                        >
                            <Grid container item spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="firstName"
                                        label="Nome"
                                        fullWidth
                                        variant="outlined"
                                        // inputRef={register({
                                        //     required: 'Esse campo é obrigatório',
                                        // })}
                                    />
                                    {/* <ErrorMessage
                                    errors={errors}
                                    name="firstName"
                                    render={({ message }) => (
                                        <Typography
                                            className={classes.ErrorMessage}
                                        >
                                            {message}
                                        </Typography>
                                    )}
                                /> */}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="username"
                                        label="Nome de Usuário"
                                        fullWidth
                                        variant="outlined"
                                        // inputRef={register({
                                        //     required: 'Esse campo é obrigatório',
                                        // })}
                                    />
                                    {/* <ErrorMessage
                                    errors={errors}
                                    name="lastName"
                                    render={({ message }) => (
                                        <Typography
                                            className={classes.ErrorMessage}
                                        >
                                            {message}
                                        </Typography>
                                    )}
                                /> */}
                                </Grid>
                            </Grid>
                            <Grid container item spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="president"
                                        label="Presidente"
                                        fullWidth
                                        variant="outlined"
                                        // inputRef={register({
                                        //     required: 'Esse campo é obrigatório',
                                        // })}
                                    />
                                    {/* <ErrorMessage
                                    errors={errors}
                                    name="president"
                                    render={({ message }) => (
                                        <Typography
                                            className={classes.ErrorMessage}
                                        >
                                            {message}
                                        </Typography>
                                    )}
                                /> */}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        // inputRef={register({
                                        //     required: 'Esse campo é obrigatório',
                                        //     pattern: {
                                        //         // eslint-disable-next-line
                                        //         value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        //         message:
                                        //             'Deve seguir o formato nome@email.com',
                                        //     },
                                        // })}
                                    />
                                    {/* <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({ message }) => (
                                        <Typography
                                            className={classes.ErrorMessage}
                                        >
                                            {message}
                                        </Typography>
                                    )}
                                /> */}
                                </Grid>
                            </Grid>
                            <Grid container item spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    {/* <InputMask
                                    mask={'(99) 99999-9999'}
                                    maskChar="_"
                                >
                                    {() => ( */}
                                    <TextField
                                        fullWidth
                                        name="phone"
                                        label="Telefone"
                                        variant="outlined"
                                        // inputRef={register({
                                        //     required:
                                        //         'Esse campo é obrigatório',
                                        //     minLength: {
                                        //         value: 15,
                                        //         message:
                                        //             'O número está incompleto',
                                        //     },
                                        // })}
                                    />
                                    {/* )} */}
                                    {/* </InputMask> */}
                                    {/* <ErrorMessage
                                    errors={errors}
                                    name="cel"
                                    render={({ message }) => (
                                        <Typography
                                            className={classes.ErrorMessage}
                                        >
                                            {message}
                                        </Typography>
                                    )}
                                /> */}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* <InputMask mask={'999.999.999-99'} maskChar="_">
                                    {() => ( */}
                                    <TextField
                                        name="cnpj"
                                        label="CNPJ"
                                        fullWidth
                                        variant="outlined"
                                        // inputRef={register({
                                        //     required:
                                        //         'Esse campo é obrigatório',
                                        //     validate: {
                                        //         cpfInvalido: value =>
                                        //             CpfValidator(value),
                                        //     },
                                        // })}
                                    />
                                    {/* )} */}
                                    {/* </InputMask> */}
                                    {/* <ErrorMessage
                                    errors={errors}
                                    name="cpf"
                                    render={({ message }) => (
                                        <Typography
                                            className={classes.ErrorMessage}
                                        >
                                            CPF inválido
                                        </Typography>
                                    )}
                                /> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            component="aside"
                            className={classes.rightSide}
                            item
                            xs={12}
                            md={3}
                        >
                            <CropImageInput
                                title="Logo da Empresa:"
                                image={image}
                                setImage={setImage}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} justify="center">
                        <SubmitButton mt={100} text="Cadastrar empresa" />
                    </Grid>
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default CompanyRegister;
