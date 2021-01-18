import React, { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { useForm } from 'react-hook-form';
import { UserTie as UserTieIcon } from '@styled-icons/fa-solid';
import { Lock as LockIcon } from '@styled-icons/material';

import useAuth from '../../../hooks/useAuth';
import { LoginType } from '../../../services';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';
import useQuery from '../../../hooks/useQuery';

import AuthLayout from '../../../layout/authLayout/authLayout';
import LogInButton from '../components/submitButton/submitButton';
import CompanyButton from './components/companyButton';
import ConfirmRegisterModal from '../components/confirmRegisterModal';
import AccountRegisteredModal from '../components/accountRegisteredModal';
import googleIcon from '../../../assets/companiesIcons/googleLogo.svg';
import microsoftIcon from '../../../assets/companiesIcons/microsoftLogo.svg';
import appleIcon from '../../../assets/companiesIcons/appleLogo.svg';
import useStyles, { inputStyle } from './styles';

const Login: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const query = useQuery();
    const { login } = useAuth();
    const { register, errors, handleSubmit } = useForm();

    const [modalIsOpen, setModalIsOpen] = useState({
        confirm: false,
        registered: false,
    });

    useEffect(() => {
        document.title = 'Mands';
    }, []);

    useEffect(() => {
        const checkConfirmedParam = () => {
            const confirmed = !!query.get('confirmed');
            if (confirmed)
                setModalIsOpen({
                    ...modalIsOpen,
                    registered: true,
                });
        };
        checkConfirmedParam();
        // eslint-disable-next-line
    }, []);

    const handleCloseConfirmModal = useCallback(
        () =>
            setModalIsOpen({
                ...modalIsOpen,
                confirm: false,
            }),
        [modalIsOpen]
    );

    const handleCloseRegisteredModal = useCallback(
        () =>
            setModalIsOpen({
                ...modalIsOpen,
                registered: false,
            }),
        [modalIsOpen]
    );

    const onSubmit = async (data: LoginType) => {
        try {
            await login(data);
            SnackbarUtils.success('Seja bem-vindo');
            history.replace('/escolha-da-empresa');
        } catch (err) {
            const error: AxiosError = err;
            console.log(error.response?.status);
            switch (error.response?.status) {
                case 401:
                    SnackbarUtils.error(
                        'Credenciais inválidas, verique sua credencial e senha'
                    );
                    break;
                case 403:
                    setModalIsOpen({
                        ...modalIsOpen,
                        confirm: true,
                    });
                    break;
                default:
                    SnackbarUtils.error('Não foi possível efetuar o login');
                    break;
            }
        }
    };

    return (
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
                                        error={errors.credential !== undefined}
                                        helperText={
                                            errors.credential
                                                ? '⚠' +
                                                  errors?.credential?.message
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
                                            ? '⚠' + errors?.password?.message
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
                                        required: 'Esse campo é obrigatório',
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
                        <Link to="/cadastro" className={classes.signUpButton}>
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
                            <CompanyButton
                                icon={googleIcon}
                                company={'Google'}
                            />
                        </Grid>
                        <Grid item xs>
                            <CompanyButton
                                icon={microsoftIcon}
                                company={'Microsoft'}
                            />
                        </Grid>
                        <Grid item xs>
                            <CompanyButton icon={appleIcon} company={'Apple'} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ConfirmRegisterModal
                isOpen={modalIsOpen.confirm}
                handleClose={handleCloseConfirmModal}
            />
            <AccountRegisteredModal
                isOpen={modalIsOpen.registered}
                handleClose={handleCloseRegisteredModal}
            />
        </AuthLayout>
    );
};

export default Login;
