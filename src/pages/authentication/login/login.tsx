import React /*, { FormEvent }*/ from 'react';
import { Link, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { UserTie as UserTieIcon } from '@styled-icons/fa-solid';
import { Lock as LockIcon } from '@styled-icons/material';

import { useAuth } from '../../../contexts/auth';
import { LoginType } from '../../../services';

import AuthLayout from '../../../layout/authLayout/authLayout';
import LogInButton from '../components/submitButton/submitButton';
import CompanyButton from './components/companyButton';
import googleIcon from '../../../assets/companiesIcons/googleLogo.svg';
import microsoftIcon from '../../../assets/companiesIcons/microsoftLogo.svg';
import appleIcon from '../../../assets/companiesIcons/appleLogo.svg';
import useStyles, { inputStyle } from './styles';

const Login: React.FC = () => {
    const { login } = useAuth();
    const classes = useStyles();
    const history = useHistory();

    // const handleSubmit = (event: FormEvent) => {
    //     event.preventDefault();
    //     console.log('handleSubmit');
    // };

    const { register, errors, handleSubmit } = useForm<LoginType>();

    const onSubmit = async (data: LoginType) => {
        try {
            /* const response = */ await login(data);
            // Animação de sucesso
            history.replace('/escolha-da-empresa');
        } catch (error) {
            // Alerta de erro
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
                            // fullWidth
                            className={classes.form}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                marginTop={3}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Email, Nome de usuário ou CPF"
                                    name="user"
                                    variant="outlined"
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
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
                                <ErrorMessage
                                    errors={errors}
                                    name="user"
                                    render={({ message }) => (
                                        <Typography
                                            className={classes.ErrorMessage}
                                        >
                                            {message}
                                        </Typography>
                                    )}
                                />
                                <TextField
                                    className={classes.input}
                                    id="outlined-basic"
                                    type="password"
                                    name="password"
                                    label="Senha"
                                    variant="outlined"
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
                            </Box>
                            <Box mt={2}>
                                <Link
                                    to="/esqueci-a-senha"
                                    className={classes.forgotPasswordButton}
                                >
                                    Esqueceu a senha?
                                </Link>
                                <LogInButton
                                    // type="submit"
                                    mt={60}
                                    text="Entrar"
                                    // onClick={handleSubmit}
                                />
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
                            to="/criar-conta"
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
        </AuthLayout>
    );
};

export default Login;
