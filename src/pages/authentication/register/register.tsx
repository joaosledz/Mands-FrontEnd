import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import CpfValidator from '../../../validators/cpfValidator';
import { /*AxiosError,*/ authApi, RegisterModel } from '../../../services';
import InputAdornment from '@material-ui/core/InputAdornment';
import AuthLayout from '../../../layout/authLayout/authLayout';
import CropImageInputComponent from '../../../components/cropImage/cropImageInput';
// import TextField from './components/textField';
import RegisterButton from '../components/submitButton/submitButton';
import { validateUsername } from './components/validators/validateUsername';
import useStyles /*,  { inputStyle } */ from './styles';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { UserCheck as ValidUserIcon } from '@styled-icons/boxicons-regular';
import { UserX as InvalidUserIcon } from '@styled-icons/boxicons-regular';
import snackbarUtils from '../../../utils/functions/snackbarUtils';
const Register: React.FC = () => {
    const classes = useStyles();
    const [image, setImage] = useState<File | undefined>(undefined);
    const [validUser, setValidUser] = useState<Boolean>(false);
    const history = useHistory();
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
    const { register, errors, handleSubmit, formState, trigger } = useForm<
        RegisterModel
    >({
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
                snackbarUtils.success('Conta criada com sucesso');
                history.replace('/login');
            })
            .catch(error => {
                snackbarUtils.success(
                    'Não foi possível criar a conta, tente novamente mais tarde'
                );
            });
    };
    useEffect(() => {
        // console.log(validUser);
        console.log(errors.username);
        console.log(errors.username === undefined);
        console.log(formState.isDirty);
    }, [validUser, errors, formState]);
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
                                    autoFocus
                                    error={errors.name !== undefined}
                                    helperText={
                                        errors.name
                                            ? '⚠' + errors?.name?.message
                                            : ''
                                    }
                                    label="Nome"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
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
                                            ? '⚠' + errors?.surname?.message
                                            : ''
                                    }
                                    label="Sobrenome"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
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
                                            ? '⚠' + errors?.username?.message
                                            : ''
                                    }
                                    data-cy="user-userName"
                                    name="username"
                                    label="Nome de usuário"
                                    onChange={() => trigger('username')}
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
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
                                    data-cy="user-email"
                                    name="email"
                                    error={errors.email !== undefined}
                                    helperText={
                                        errors.email
                                            ? '⚠' + errors?.email?.message
                                            : ''
                                    }
                                    type="Text"
                                    label="Email"
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
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <InputMask mask={'999.999.999-99'} maskChar="_">
                                    {() => (
                                        <TextField
                                            data-cy="user-cpf"
                                            name="cpf"
                                            error={errors.cpf !== undefined}
                                            helperText={
                                                errors.cpf
                                                    ? '⚠' + errors?.cpf?.message
                                                    : ''
                                            }
                                            label="CPF"
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                                validate: {
                                                    cpfInvalido: value =>
                                                        CpfValidator(value) ||
                                                        'CPF inválido',
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
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    data-cy="user-password"
                                    name="password"
                                    error={errors.password !== undefined}
                                    helperText={
                                        errors.password
                                            ? '⚠' + errors?.password?.message
                                            : ''
                                    }
                                    type="password"
                                    label="Senha"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'Senha muito curta (min: 6)',
                                        },
                                    })}
                                />
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
