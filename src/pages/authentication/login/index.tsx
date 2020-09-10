import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
// import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { UserTie } from '@styled-icons/fa-solid';
import { Lock } from '@styled-icons/material';

import AuthLayout from '../../../layout/authLayout';
import LogInButton from '../../../components/authPagesButton';
import CompanyButton from './components/companyButton';
import useStyles, { inputStyle } from './styles';

import googleIcon from '../../../assets/companiesIcons/googleLogo.svg';
import microsoftIcon from '../../../assets/companiesIcons/microsoftLogo.svg';
import appleIcon from '../../../assets/companiesIcons/appleLogo.svg';

const Login: React.FC = () => {
    const classes = useStyles();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log('handleSubmit');
    };

    return (
        <AuthLayout>
            <Grid container className={classes.container}>
                <Grid item xs={12} sm={6}>
                    <Box mt={4}>
                        <Typography
                            style={{ fontSize: 40, fontWeight: 700 }}
                            color="primary"
                        >
                            Log in
                        </Typography>
                        <FormControl fullWidth className={classes.form}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                marginTop={3}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <UserTie
                                                size="20"
                                                color="#B03E9F"
                                            />
                                        ),
                                    }}
                                    inputProps={{
                                        style: inputStyle,
                                    }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    type="password"
                                    label="Senha"
                                    variant="outlined"
                                    className={classes.input}
                                    InputProps={{
                                        startAdornment: (
                                            <Lock size="20" color="#B03E9F" />
                                        ),
                                    }}
                                    inputProps={{
                                        style: inputStyle,
                                    }}
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
                                    type="submit"
                                    mt={60}
                                    text="Entrar"
                                    onClick={handleSubmit}
                                />
                            </Box>
                        </FormControl>
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
                    {/* <Divider className={classes.divider} /> */}
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
