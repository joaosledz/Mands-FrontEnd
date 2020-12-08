import React, { useState, useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import CpfValidator from '../../../validators/cpfValidator';
import { /*AxiosError,*/ authApi, RegisterModel } from '../../../services';

import AuthLayout from '../../../layout/authLayout/authLayout';
import CropImageInputComponent from '../../../components/cropImage/cropImageInput';
// import TextField from './components/textField';
import RegisterButton from '../components/submitButton/submitButton';
import { validateUsername } from './components/validators/validateUsername';
import useStyles /*,  { inputStyle } */ from './styles';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

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

    const { register, errors, handleSubmit } = useForm<RegisterModel>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: true,
    });

    const onSubmit = (data: RegisterModel) => {
        console.log(data);
        authApi
            .register(data)
            .then(response => {
                console.log(response);
                //sucess alert
            })
            .catch(error => {
                //error alert
            });
    };

    return (
        <AuthLayout backButtonMessage="Voltar para o Login">
            <Grid
                component="form"
                container
                className={classes.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid item xs={12} className={classes.titleContainer}>
                    <Typography color="primary">Criar sua conta</Typography>
                </Grid>
                <Grid container item xs={12} className={classes.formContent}>
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
                                    data-cy="user-firstName"
                                    name="name"
                                    label="Nome"
                                    fullWidth
                                    variant="outlined"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => (
                                        <Typography
                                            className={classes.ErrorMessage}
                                        >
                                            {message}
                                        </Typography>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-cy="user-lastName"
                                    name="surname"
                                    label="Sobrenome"
                                    fullWidth
                                    variant="outlined"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="surname"
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
                        <Grid container item spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-cy="user-userName"
                                    name="username"
                                    label="Nome de usuário"
                                    fullWidth
                                    variant="outlined"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
                                        validate: AwesomeDebouncePromise(
                                            async value => {
                                                return (
                                                    (await validateUsername(
                                                        value
                                                    )) ||
                                                    'Nome de usuário indisponível'
                                                );
                                            },
                                            500
                                        ),
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="username"
                                    render={({ message }) => (
                                        <Typography
                                            className={classes.ErrorMessage}
                                        >
                                            {/* {errors.username?.type ===
                                                'usernameInvalid' &&
                                                'Nome de usuário indisponível'} */}
                                            {message}
                                        </Typography>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-cy="user-email"
                                    name="email"
                                    type="Text"
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
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
                                            className={classes.ErrorMessage}
                                        >
                                            {message}
                                        </Typography>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <InputMask mask={'999.999.999-99'} maskChar="_">
                                    {() => (
                                        <TextField
                                            data-cy="user-cpf"
                                            name="cpf"
                                            label="CPF"
                                            fullWidth
                                            variant="outlined"
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                                validate: {
                                                    cpfInvalido: value =>
                                                        CpfValidator(value),
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
                                            className={classes.ErrorMessage}
                                        >
                                            CPF inválido
                                        </Typography>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputMask
                                    mask={'(99) 99999-9999'}
                                    maskChar="_"
                                >
                                    {() => (
                                        <TextField
                                            data-cy="user-phone"
                                            name="phone"
                                            fullWidth
                                            variant="outlined"
                                            label="Telefone"
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
                                    name="phone"
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
                        <Grid container item spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-cy="user-password"
                                    name="password"
                                    type="password"
                                    label="Senha"
                                    fullWidth
                                    variant="outlined"
                                    // InputProps={{
                                    //     startAdornment: (
                                    //         <LockIcon
                                    //             size="20"
                                    //             color="#B03E9F"
                                    //         />
                                    //     ),
                                    //     style: inputStyle,
                                    // }}
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
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
                                            className={classes.ErrorMessage}
                                        >
                                            {message}
                                        </Typography>
                                    )}
                                />
                                {!errors.password && (
                                    <Typography
                                        component="span"
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 300,
                                        }}
                                    >
                                        Use 6 caracteres no mínimo
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid component="aside" item xs={12} md={3}>
                        {CropImageInput}
                    </Grid>
                </Grid>
                <RegisterButton mt={60} text="Criar conta" />
            </Grid>
        </AuthLayout>
    );
};

export default Register;
