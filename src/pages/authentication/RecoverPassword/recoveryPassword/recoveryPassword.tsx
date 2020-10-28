import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Lock } from '@styled-icons/material';

import AuthLayout from '../../../../layout/authLayout/authLayout';
import SendEmailButton from '../../components/submitButton/submitButton';
import useStyles, { inputStyle } from './styles';
import forgotPasswordIllustration from '../../../../assets/forgotPasswordIllustration.svg';

const email = 'exemplo@email.com';

const RecoveryPassword: React.FC = () => {
    const classes = useStyles();

    const { register, errors, handleSubmit } = useForm<LoginInput>();
    interface LoginInput {
        password: string;
    }
    const onSubmit = (data: LoginInput) => {
        console.log(data);
    };

    return (
        <AuthLayout backButtonMessage="Voltar para o Login">
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <Box mt={4}>
                        <Typography className={classes.title} color="primary">
                            Recuperar Senha
                        </Typography>
                        <Typography className={classes.description}>
                            Digite abaixo a nova senha para a conta:
                        </Typography>
                        <Typography className={classes.email}>
                            {email}
                        </Typography>
                        <form
                            className={classes.form}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextField
                                className={classes.input}
                                fullWidth
                                id="outlined-basic"
                                type="password"
                                name="password"
                                label="Senha"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <Lock size="20" color="#B03E9F" />
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
                            <SendEmailButton
                                mt={60}
                                mw={350}
                                mwt={390}
                                text="Alterar senha"
                                icon="email"
                                type="submit"
                            />
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <img
                        src={forgotPasswordIllustration}
                        style={{ width: '80%', minWidth: 260, height: 'auto' }}
                        alt="Ilustração de um homem, com o dedo indicador no queixo, tentando lembrar a senha da conta"
                    />
                </Grid>
            </Grid>
        </AuthLayout>
    );
};

export default RecoveryPassword;
