import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { UserCheck as ValidUserIcon } from '@styled-icons/boxicons-regular';
import { UserX as InvalidUserIcon } from '@styled-icons/boxicons-regular';
import sha1 from 'sha1';

import CpfValidator from '../../../validators/cpfValidator';
import snackbarUtils from '../../../utils/functions/snackbarUtils';
import { authApi, RegisterModel, imageApi, LoginType } from '../../../services';
import { validateUsername } from './components/validators/validateUsername';
import useAuth from '../../../hooks/useAuth';

import AuthLayout from '../../../layout/authLayout/authLayout';
import Backdrop from '../../../components/backdrop';
import RegisterButton from '../components/submitButton/submitButton';
import useStyles from './styles';

type TypeThirdPartyData = {
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    imageUrl: string;
    name: string;
};

type LocationType = {
    data: TypeThirdPartyData;
};

const Register: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const { thirdPartyLogin } = useAuth();
    const location = useLocation<LocationType>();
    const {
        register,
        errors,
        handleSubmit,
        formState,
        trigger,
        setValue,
    } = useForm<RegisterModel>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: true,
    });

    const [validUser, setValidUser] = useState(false);
    const [userData, setUserData] = useState<undefined | TypeThirdPartyData>();

    useEffect(() => {
        console.log(validUser);
    }, [validUser]);

    useEffect(() => {
        setUserData(location.state.data);
        setValue('name', location.state.data.givenName);
        setValue('surname', location.state.data.familyName);
    }, [location, setValue]);

    const onSubmit = async (data: RegisterModel) => {
        const registerData: RegisterModel = {
            ...data,
            name: userData!.givenName,
            email: userData!.email,
            surname: userData!.familyName,
            password: sha1(userData!.id),
        };

        const loginData: LoginType = {
            credential: userData!.email,
            password: userData!.id,
        };

        try {
            await authApi.thirdPartyRegister(registerData);

            await thirdPartyLogin(loginData, userData!.imageUrl);

            await imageApi.postThirdParty(userData!.imageUrl);

            snackbarUtils.success('Seja bem-vindo');
            history.replace('/escolha-da-empresa');
        } catch (error) {
            snackbarUtils.error(
                error.response.data ? error.response.data : error.message
            );
        }
    };

    return (
        <Fragment>
            <Backdrop loading={formState.isSubmitting} />
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
                                        data-cy="user-firstName"
                                        name="name"
                                        autoFocus
                                        error={errors.name !== undefined}
                                        helperText={
                                            errors.name
                                                ? '⚠ ' + errors?.name?.message
                                                : ''
                                        }
                                        label="Nome"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                            minLength: {
                                                value: 3,
                                                message:
                                                    'Escreva pelo menos 3 caracteres',
                                            },
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        data-cy="user-lastName"
                                        name="surname"
                                        error={errors.surname !== undefined}
                                        helperText={
                                            errors.surname
                                                ? '⚠ ' +
                                                  errors?.surname?.message
                                                : ''
                                        }
                                        label="Sobrenome"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                            minLength: {
                                                value: 3,
                                                message:
                                                    'Escreva pelo menos 3 caracteres',
                                            },
                                        })}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.username !== undefined}
                                        helperText={
                                            errors.username
                                                ? '⚠ ' +
                                                  errors?.username?.message
                                                : ''
                                        }
                                        data-cy="user-userName"
                                        name="username"
                                        label="Nome de usuário"
                                        onChange={() => trigger('username')}
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                            pattern: {
                                                // eslint-disable-next-line
                                                value: /^[a-zA-Z_-]+$/,
                                                message:
                                                    'Nome de usuário deve conter somente letras e "-","_"',
                                            },
                                            validate: AwesomeDebouncePromise(
                                                async value => {
                                                    return (
                                                        (await validateUsername(
                                                            value,
                                                            setValidUser
                                                        )) ||
                                                        'Nome de usuário indisponível'
                                                    );
                                                },
                                                500
                                            ),
                                        })}
                                        InputProps={{
                                            endAdornment:
                                                errors.username === undefined &&
                                                formState.isDirty ? (
                                                    <InputAdornment position="end">
                                                        <ValidUserIcon
                                                            className={
                                                                classes.iconValidUser
                                                            }
                                                        />
                                                    </InputAdornment>
                                                ) : (
                                                    formState.isDirty && (
                                                        <InputAdornment position="end">
                                                            <InvalidUserIcon
                                                                className={
                                                                    classes.iconInvalidUser
                                                                }
                                                            />
                                                        </InputAdornment>
                                                    )
                                                ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={userData?.email}
                                        disabled
                                        data-cy="user-email"
                                        name="email"
                                        error={errors.email !== undefined}
                                        helperText={
                                            errors.email
                                                ? '⚠ ' + errors?.email?.message
                                                : ''
                                        }
                                        type="Text"
                                        label="Email"
                                        inputRef={register({
                                            required:
                                                'Este campo é obrigatório',
                                            pattern: {
                                                // eslint-disable-next-line
                                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message:
                                                    'Deve seguir o formato nome@email.com',
                                            },
                                        })}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <InputMask
                                        mask={'999.999.999-99'}
                                        maskChar="_"
                                    >
                                        {() => (
                                            <TextField
                                                data-cy="user-cpf"
                                                name="cpf"
                                                error={errors.cpf !== undefined}
                                                helperText={
                                                    errors.cpf
                                                        ? '⚠ ' +
                                                          errors?.cpf?.message
                                                        : ''
                                                }
                                                label="CPF"
                                                inputRef={register({
                                                    required:
                                                        'Este campo é obrigatório',
                                                    validate: {
                                                        cpfInvalido: value =>
                                                            CpfValidator(
                                                                value
                                                            ) || 'CPF inválido',
                                                    },
                                                })}
                                            />
                                        )}
                                    </InputMask>
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
                                                label="Telefone"
                                                inputRef={register({
                                                    required:
                                                        'Este campo é obrigatório',
                                                    minLength: {
                                                        value: 15,
                                                        message:
                                                            'O número está incompleto',
                                                    },
                                                })}
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <RegisterButton mt={60} text="Criar conta" />
                </Grid>
            </AuthLayout>
        </Fragment>
    );
};

export default Register;
