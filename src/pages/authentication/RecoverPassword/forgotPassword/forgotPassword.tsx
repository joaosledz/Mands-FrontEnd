import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';

import { authApi } from '../../../../services';

import AuthLayout from '../../../../layout/authLayout/authLayout';
import SendEmailButton from '../../components/submitButton/submitButton';
import forgotPasswordIllustration from '../../../../assets/forgotPasswordIllustration.svg';
import useStyles, { inputStyle } from './styles';
import SnackbarUtils from '../../../../utils/functions/snackbarUtils';

type FormProps = {
    email: string;
};

const ForgotPassword: React.FC = () => {
    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm<FormProps>();

    const onSubmit = async (data: FormProps) => {
        try {
            await authApi.recoverPassword(data.email);
            SnackbarUtils.success('E-mail enviado');
        } catch (error) {
            SnackbarUtils.error(
                'Não foi possível enviar o e-mail. Tente novamente mais tarde'
            );
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
                            error={errors.email !== undefined}
                            helperText={
                                errors.email ? '⚠' + errors?.email?.message : ''
                            }
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
