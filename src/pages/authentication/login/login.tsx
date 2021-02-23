import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Axios, { AxiosError } from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { useForm } from 'react-hook-form';
import { UserTie as UserTieIcon } from '@styled-icons/fa-solid';
import { Lock as LockIcon } from '@styled-icons/material';

import { authApi } from '../../../services';
import useAuth from '../../../hooks/useAuth';
import { LoginType } from '../../../services';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';
import useQuery from '../../../hooks/useQuery';

import AuthLayout from '../../../layout/authLayout/authLayout';
import LogInButton from '../components/submitButton/submitButton';
import CompanyButton from './components/companyButton';
import Backdrop from '../../../components/backdrop';
import ConfirmRegisterModal from '../components/confirmRegisterModal';
import AccountRegisteredModal from '../components/accountRegisteredModal';
import googleIcon from '../../../assets/companiesIcons/googleLogo.svg';
import microsoftIcon from '../../../assets/companiesIcons/microsoftLogo.svg';
import appleIcon from '../../../assets/companiesIcons/appleLogo.svg';
import githubIcon from '../../../assets/socialMedia/Github.png';
import useStyles, { inputStyle } from './styles';

import thirdPartyIds from '../../../utils/data/thirdPartyIds';
import GoogleLogin from 'react-google-login';
import FacebookLogin from './components/facebookButton';
import GithubLogin from './components/githubButton';

type TypeAuthModel = {
    credential: string;
    password: string;
};

type TypeThirdPartyData = {
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    imageUrl: string;
    name: string;
};

const Login: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const query = useQuery();
    const { login, thirdPartyLogin, getGithubAccess } = useAuth();
    const { register, errors, handleSubmit, formState, watch } = useForm<
        TypeAuthModel
    >();

    const [modalIsOpen, setModalIsOpen] = useState({
        confirm: false,
        registered: false,
    });

    const credentialWatch = watch('credential');

    useEffect(() => {
        document.title = 'Mands';
    }, []);

    useEffect(() => {
        const checkConfirmedParam = () => {
            const confirmed = !!query.get('confirmed');
            if (confirmed) handleRegisteredModal();
        };
        checkConfirmedParam();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const checkConfirmParam = () => {
            const confirm = !!query.get('confirm');
            if (confirm) handleConfirmModal();
        };
        checkConfirmParam();
        // eslint-disable-next-line
    }, []);

    const handleConfirmModal = useCallback(
        () =>
            setModalIsOpen(value => ({
                ...value,
                confirm: !value.confirm,
            })),
        []
    );

    const handleRegisteredModal = useCallback(
        () =>
            setModalIsOpen(value => ({
                ...value,
                registered: !value.registered,
            })),
        []
    );

    const onSubmit = async (data: LoginType) => {
        try {
            await login(data);
            SnackbarUtils.success('Seja bem-vindo');
            history.replace('/escolha-da-empresa');
        } catch (err) {
            const error: AxiosError = err;

            switch (error.response?.status) {
                case 401:
                    SnackbarUtils.warning(
                        'Credenciais inválidas, verique sua credencial e senha'
                    );
                    break;
                case 403:
                    setModalIsOpen(value => ({
                        ...value,
                        confirm: true,
                    }));
                    SnackbarUtils.info('Conta pendente de confirmação');
                    break;
                default:
                    SnackbarUtils.error('Não foi possível efetuar o login');
                    break;
            }
        }
    };

    const onThirdParty = async (data: TypeThirdPartyData) => {
        try {
            const loginData: LoginType = {
                credential: data.email,
                password: data.id,
            };

            await thirdPartyLogin(loginData);

            SnackbarUtils.success('Seja bem-vindo');
            history.replace('/escolha-da-empresa');
        } catch (err) {
            const error: AxiosError = err;

            switch (error.response?.status) {
                case 401:
                    authApi
                        .verifyEmail(data.email)
                        .then(_ =>
                            history.push({
                                pathname: '/cadastro-terceiros',
                                state: { data },
                            })
                        )
                        .catch(_ => SnackbarUtils.error('Email já cadastrado'));
                    break;
                case 403:
                    setModalIsOpen(value => ({
                        ...value,
                        confirm: true,
                    }));
                    SnackbarUtils.info('Conta pendente de confirmação');
                    break;
                default:
                    SnackbarUtils.error('Não foi possível efetuar o login');
                    break;
            }
        }
    };

    const handleGithubLogin = async (code: string) => {
        try {
            const token = await getGithubAccess({
                code: code,
                clientId: thirdPartyIds.github.client_id,
                clientSecret: thirdPartyIds.github.client_secret!,
            });

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await Axios.get(
                'https://api.github.com/user',
                config
            );

            const githubData: TypeThirdPartyData = {
                email: data.email,
                familyName: data.name.split(' ')[1],
                givenName: data.name.split(' ')[0],
                id: data.node_id,
                imageUrl: data.avatar_url,
                name: data.name,
            };

            onThirdParty(githubData);
        } catch (err) {
            const error: AxiosError = err;

            switch (error.response?.status) {
                case 401:
                    SnackbarUtils.warning(
                        'Credenciais inválidas, verique sua credencial e senha'
                    );
                    break;
                case 403:
                    setModalIsOpen(value => ({
                        ...value,
                        confirm: true,
                    }));
                    SnackbarUtils.info('Conta pendente de confirmação');
                    break;
                default:
                    SnackbarUtils.error('Não foi possível efetuar o login');
                    break;
            }
        }
    };

    return (
        <Fragment>
            <Backdrop loading={formState.isSubmitting} />
            <AuthLayout>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Box mt={4}>
                            <Typography
                                style={{ fontSize: 40, fontWeight: 700 }}
                                color="primary"
                            >
                                Log in
                            </Typography>
                            <form
                                className={classes.form}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    marginTop={3}
                                >
                                    <Tooltip
                                        aria-label="Email, Nome de usuário ou CPF"
                                        title="Email, Nome de usuário ou CPF"
                                        arrow
                                        placement="top"
                                    >
                                        <TextField
                                            id="outlined-basic"
                                            autoFocus
                                            label="Acesso"
                                            name="credential"
                                            error={
                                                errors.credential !== undefined
                                            }
                                            helperText={
                                                errors.credential
                                                    ? '⚠' +
                                                      errors?.credential
                                                          ?.message
                                                    : ''
                                            }
                                            inputRef={register({
                                                required:
                                                    'Esse campo é obrigatório',
                                            })}
                                            InputProps={{
                                                startAdornment: (
                                                    <UserTieIcon
                                                        size="20"
                                                        color="#B03E9F"
                                                    />
                                                ),
                                            }}
                                            inputProps={{
                                                style: inputStyle,
                                            }}
                                        />
                                    </Tooltip>
                                    <TextField
                                        className={classes.input}
                                        id="outlined-basic"
                                        type="password"
                                        name="password"
                                        label="Senha"
                                        error={errors.password !== undefined}
                                        helperText={
                                            errors.password
                                                ? '⚠' +
                                                  errors?.password?.message
                                                : ''
                                        }
                                        InputProps={{
                                            startAdornment: (
                                                <LockIcon
                                                    size="20"
                                                    color="#B03E9F"
                                                />
                                            ),
                                        }}
                                        inputProps={{
                                            style: inputStyle,
                                        }}
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                            minLength: {
                                                value: 6,
                                                message: 'A senha está curta',
                                            },
                                        })}
                                    />
                                </Box>
                                <Box mt={2}>
                                    <Link
                                        to="/esqueci-a-senha"
                                        className={classes.forgotPasswordButton}
                                    >
                                        Esqueceu a senha?
                                    </Link>
                                    <LogInButton mt={60} text="Entrar" />
                                </Box>
                            </form>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            mt={8}
                        >
                            <Typography className={classes.signUpText}>
                                Não possui uma conta?
                            </Typography>
                            <Link
                                to="/cadastro"
                                className={classes.signUpButton}
                            >
                                Cadastre-se
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.rightSide}>
                        <Typography
                            style={{ fontFamily: 'Roboto', color: '#7A7A7A' }}
                        >
                            Ou acesse usando uma das suas contas:
                        </Typography>
                        <Box className={classes.divider} />
                        <Grid
                            container
                            spacing={5}
                            alignItems="center"
                            justify="center"
                            direction="column"
                        >
                            <Grid item xs>
                                <GoogleLogin
                                    clientId={thirdPartyIds.google.client_id}
                                    render={renderProps => (
                                        <CompanyButton
                                            icon={googleIcon}
                                            company={'Google'}
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                        />
                                    )}
                                    buttonText="Login"
                                    onSuccess={({ profileObj }) =>
                                        onThirdParty({
                                            email: profileObj!.email,
                                            familyName: profileObj!.familyName,
                                            givenName: profileObj!.givenName,
                                            id: profileObj!.googleId,
                                            imageUrl: profileObj!.imageUrl,
                                            name: profileObj!.name,
                                        })
                                    }
                                    onFailure={() =>
                                        SnackbarUtils.error(
                                            'Não foi possível efetuar o login'
                                        )
                                    }
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Grid>
                            <Grid item xs>
                                <CompanyButton
                                    icon={microsoftIcon}
                                    company={'Microsoft'}
                                    onClick={() => {}}
                                />
                            </Grid>
                            <Grid item xs>
                                <CompanyButton
                                    icon={appleIcon}
                                    company={'Apple'}
                                    onClick={() => {}}
                                />
                            </Grid>
                            <Grid item xs>
                                <FacebookLogin
                                    onSuccess={(response: any) =>
                                        onThirdParty({
                                            email: response.email,
                                            familyName: response.name.split(
                                                ' '
                                            )[1],
                                            givenName: response.name.split(
                                                ' '
                                            )[0],
                                            id: response.id,
                                            imageUrl: response.picture.data.url,
                                            name: response.name,
                                        })
                                    }
                                    onFailure={() =>
                                        SnackbarUtils.error(
                                            'Não foi possível efetuar o login'
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs>
                                <GithubLogin
                                    clientId={thirdPartyIds.github.client_id}
                                    onFailure={() =>
                                        SnackbarUtils.error(
                                            'Não foi possível efetuar o login'
                                        )
                                    }
                                    onSuccess={response =>
                                        handleGithubLogin(response)
                                    }
                                    render={renderProps => (
                                        <CompanyButton
                                            icon={githubIcon}
                                            company={'Github'}
                                            onClick={renderProps.onClick}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AuthLayout>
            <ConfirmRegisterModal
                isOpen={modalIsOpen.confirm}
                handleClose={handleConfirmModal}
                credential={credentialWatch}
            />
            <AccountRegisteredModal
                isOpen={modalIsOpen.registered}
                handleClose={handleRegisteredModal}
            />
        </Fragment>
    );
};

export default Login;
