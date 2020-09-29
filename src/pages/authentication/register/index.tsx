import React, { useState, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Lock as LockIcon } from '@styled-icons/material';

import CpfValidator from '../../../validators/cpfValidator';

import AuthLayout from '../../../layout/authLayout';
import CropImageInputComponent from '../../../components/cropImage/cropImageInput';
// import TextField from './components/textField';
import RegisterButton from '../../../components/authPagesButton';
import useStyles, { inputStyle } from './styles';

const Register: React.FC = () => {
    const classes = useStyles();

    const [image, setImage] = useState<File | undefined>(undefined);

    //#region CropImageSetup

    const CropImageInput = useMemo(
        () => (
            <CropImageInputComponent
                title="Imagem do Perfil:"
                image={image}
                setImage={setImage}
            />
        ),
        [image]
    );
    //#endregion

    interface RegisterInput {
        firstName: string;
        lastName: string;
        email: string;
        cpf: string;
        cel: string;
        password: string;
    }

    const { register, errors, handleSubmit } = useForm<RegisterInput>();

    const onSubmit = (data: RegisterInput) => {
        console.log(data);
    };

    return (
        <AuthLayout backButtonMessage="Voltar para o Login">
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid component="article" container>
                    <Grid item xs={12} sm={8}>
                        <Box mt={4}>
                            <Typography
                                style={{ fontSize: 40, fontWeight: 700 }}
                                color="primary"
                            >
                                Criar sua conta
                            </Typography>
                            <Grid
                                container
                                spacing={3}
                                style={{ marginTop: 20 }}
                            >
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="firstName"
                                            label="Nome"
                                            fullWidth
                                            variant="outlined"
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="firstName"
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
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="lastName"
                                            label="Sobrenome"
                                            fullWidth
                                            variant="outlined"
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="lastName"
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
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="email"
                                            type="Text"
                                            label="Email"
                                            fullWidth
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
                                    <Grid item xs={12} sm={6}>
                                        <InputMask
                                            mask={'999.999.999-99'}
                                            maskChar="_"
                                        >
                                            {() => (
                                                <TextField
                                                    name="cpf"
                                                    label="CPF"
                                                    fullWidth
                                                    variant="outlined"
                                                    inputRef={register({
                                                        required:
                                                            'Esse campo é obrigatório',
                                                        validate: {
                                                            cpfInvalido: value =>
                                                                CpfValidator(
                                                                    value
                                                                ),
                                                        },
                                                    })}
                                                />
                                            )}
                                        </InputMask>
                                        <ErrorMessage
                                            errors={errors}
                                            name="cpf"
                                            render={({ message }) => (
                                                <Typography
                                                    className={
                                                        classes.ErrorMessage
                                                    }
                                                >
                                                    CPF inválido
                                                </Typography>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <InputMask
                                            mask={'(99) 99999-9999'}
                                            maskChar="_"
                                        >
                                            {() => (
                                                <TextField
                                                    name="cel"
                                                    fullWidth
                                                    variant="outlined"
                                                    label="Celular"
                                                    inputRef={register({
                                                        required:
                                                            'Esse campo é obrigatório',
                                                        minLength: {
                                                            value: 15,
                                                            message:
                                                                'O número está incompleto',
                                                        },
                                                    })}
                                                />
                                            )}
                                        </InputMask>
                                        <ErrorMessage
                                            errors={errors}
                                            name="cel"
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
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="password"
                                            type="password"
                                            label="Senha"
                                            fullWidth
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: (
                                                    <LockIcon
                                                        size="20"
                                                        color="#B03E9F"
                                                    />
                                                ),
                                                style: inputStyle,
                                            }}
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                                minLength: {
                                                    value: 6,
                                                    message:
                                                        'Senha muito curta (min: 6)',
                                                },
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="password"
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
                                        {/* <Typography
                                            component="span"
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 300,
                                            }}
                                        >
                                            Use 6 caracteres no mínimo
                                        </Typography> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid
                        component="aside"
                        className={classes.rightSide}
                        item
                        xs={12}
                        sm={4}
                    >
                        {CropImageInput}
                    </Grid>
                    <RegisterButton mt={40} text="Criar conta" />
                </Grid>
            </form>
        </AuthLayout>
    );
};

export default Register;
