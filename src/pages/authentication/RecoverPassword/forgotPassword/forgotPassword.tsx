import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { authApi } from '../../../../services';

import AuthLayout from '../../../../layout/authLayout/authLayout';
import SendEmailButton from '../../components/submitButton/submitButton';
import forgotPasswordIllustration from '../../../../assets/forgotPasswordIllustration.svg';
import useStyles, { inputStyle } from './styles';

type FormProps = {
    email: string;
};

const ForgotPassword: React.FC = () => {
    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm<FormProps>();

    const onSubmit = async (data: FormProps) => {
        try {
            await authApi.recoverPassword(data.email);
            // toast de email enviado
        } catch (error) {
            // toast de erro
        }
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
                    <FormControl
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        fullWidth
                    >
                        <TextField
                            id="outlined-basic"
                            name="email"
                            label="Email"
                            variant="outlined"
                            inputProps={{
                                style: inputStyle,
                            }}
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
                                <Typography className={classes.ErrorMessage}>
                                    {message}
                                </Typography>
                            )}
                        />
                        <SendEmailButton
                            mt={60}
                            mw={350}
                            mwt={390}
                            text="Enviar link de reset"
                            icon="email"
                            type="submit"
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
