import React, { FormEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import AuthLayout from '../../../layout/authLayout/authLayout';
import SendEmailButton from '../components/submitButton/submitButton';
import useStyles, { inputStyle } from './styles';

import forgotPasswordIllustration from '../../../assets/forgotPasswordIllustration.svg';

const ForgotPassword: React.FC = () => {
    const classes = useStyles();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log('handleSubmit');
    };

    return (
        <AuthLayout backButtonMessage="Voltar para o Login">
            <Grid container>
                <Grid item xs={12} sm={7} className={classes.formGrid}>
                    <Typography className={classes.title} color="primary">
                        Esqueceu sua senha?
                    </Typography>
                    <Typography className={classes.description}>
                        Digite o seu email abaixo. Enviarmos um link para que
                        você possa resetar sua senha.
                    </Typography>
                    <FormControl fullWidth className={classes.form}>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            inputProps={{
                                style: inputStyle,
                            }}
                        />
                        <SendEmailButton
                            mt={60}
                            mw={350}
                            mwt={390}
                            text="Enviar link de reset"
                            icon="email"
                            onClick={handleSubmit}
                        />
                    </FormControl>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={12} sm={5}>
                        <img
                            src={forgotPasswordIllustration}
                            style={{
                                width: '80%',
                                minWidth: 260,
                                height: 'auto',
                            }}
                            alt="Ilustração de um homem, com o dedo indicador no queixo, tentando lembrar a senha da conta"
                        />
                    </Grid>
                </Hidden>
            </Grid>
        </AuthLayout>
    );
};

export default ForgotPassword;
