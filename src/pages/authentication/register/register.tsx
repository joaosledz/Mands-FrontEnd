import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useForm } from 'react-hook-form';
import { UserCheck as ValidUserIcon } from '@styled-icons/boxicons-regular';
import { UserX as InvalidUserIcon } from '@styled-icons/boxicons-regular';

import CpfValidator from '../../../validators/cpfValidator';
import encrypt from '../../../utils/functions/encrypt';
// import snackbarUtils from '../../../utils/functions/snackbarUtils';
import { authApi, RegisterModel } from '../../../services';
import { validateUsername } from './components/validators/validateUsername';

import AuthLayout from '../../../layout/authLayout/authLayout';
import CropImageInputComponent from '../../../components/cropImage/cropImageInput';
import RegisterButton from '../components/submitButton/submitButton';
import ConfirmRegisterModal from '../components/confirmRegisterModal';
import useStyles from './styles';

const Register: React.FC = () => {
    const classes = useStyles();
    // const history = useHistory();

    const [image, setImage] = useState<File | undefined>(undefined);
    const [validUser, setValidUser] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        console.log(validUser);
    }, [validUser]);

    const handleCloseModal = useCallback(() => setModalIsOpen(false), []);

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

    const onSubmit = async (data: RegisterModel) => {
        const userData: RegisterModel = {
            ...data,
            password: encrypt(data.password),
        };
        try {
            await authApi.register(userData);
            // snackbarUtils.success('Empresa criada com sucesso');
        } catch (error) {
            // snackbarUtils.error(error.message);
        }
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
            <ConfirmRegisterModal
                isOpen={modalIsOpen}
                handleClose={handleCloseModal}
            />
        </AuthLayout>
    );
};

export default Register;
