import React, { FormEvent } from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
// import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';

import { UserTie } from '@styled-icons/fa-solid';
import { Lock } from '@styled-icons/material';

import LogInButton from './components/logInButton';
import CompanyButton from './components/companyButton';

import logo from '../../assets/logo.svg';
import googleIcon from '../../assets/companiesIcons/googleLogo.svg';
import microsoftIcon from '../../assets/companiesIcons/microsoftLogo.svg';
import appleIcon from '../../assets/companiesIcons/appleLogo.svg';

const Login: React.FC = () => {
    const classes = useStyles();

    const handleForgotPassword = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log('handleForgotPassword');
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log('handleSubmit');
    };

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} sm={6}>
                <img
                    src={logo}
                    alt="logo"
                    style={{ width: '20%', minWidth: 130, height: 'auto' }}
                />
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
                                        <UserTie size="20" color="#B03E9F" />
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
                            <ButtonBase
                                className={classes.forgotPasswordButton}
                                onClick={handleForgotPassword}
                            >
                                Esqueceu a senha?
                            </ButtonBase>
                            <LogInButton
                                type="submit"
                                mt={60}
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
                    <ButtonBase
                        className={classes.signUpButton}
                        onClick={() => console.log('New Account')}
                    >
                        Cadastre-se
                    </ButtonBase>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.rightSide}>
                <Typography style={{ fontFamily: 'Roboto', color: '#7A7A7A' }}>
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
                        <CompanyButton icon={googleIcon} company={'Google'} />
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
    );
};

const useStyles = makeStyles(theme => ({
    container: { padding: '5% 10% 0px' },

    form: {
        paddingRight: '15%',
    },

    rightSide: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        marginTop: 20,
    },
    forgotPasswordButton: {
        color: '#515151',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 300,

        transition: 'all .2s',

        '&:hover': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    },
    signUpText: {
        font: 'italic 300 16px Roboto',
        color: '#8A8A8A',
    },

    signUpButton: {
        marginLeft: 5,

        color: '#555',
        // fontSize: 16,
        font: '16px Roboto Slab',

        '&:hover': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    },

    divider: {
        margin: theme.spacing(2, 0),
        width: '60%',
        border: '1px solid gray',
        opacity: 0.2,
    },
}));

const inputStyle = {
    paddingLeft: 5,
    fontFamily: 'Roboto',
};

export default Login;
