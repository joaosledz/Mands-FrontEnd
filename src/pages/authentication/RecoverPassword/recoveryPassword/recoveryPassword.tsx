import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Lock } from '@styled-icons/material';
import {
    Eye as EyeIcon,
    EyeSlash as EyeSlashIcon,
} from '@styled-icons/fa-solid';

import { authApi, TypeUser } from '../../../../services';

import AuthLayout from '../../../../layout/authLayout/authLayout';
import SendEmailButton from '../../components/submitButton/submitButton';
import useStyles, { inputStyle } from './styles';
import forgotPasswordIllustration from '../../../../assets/forgotPasswordIllustration.svg';
import SnackbarUtils from '../../../../utils/functions/snackbarUtils';

const email = 'exemplo@email.com';

type FormProps = {
    password: string;
};

const RecoveryPassword: React.FC = () => {
    const classes = useStyles();
    const params = useParams<{ token: string }>();
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm<FormProps>();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<TypeUser | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setLoading(true);
        document.title = 'Trocar senha - Mands';
        const getUserData = async () => {
            try {
                const response = await authApi.me(params.token);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                SnackbarUtils.error('Token expirado ou incorreto');
                history.replace('/');
            }
        };
        getUserData();
    }, [params.token, history]);

    const onSubmit = async (data: FormProps) => {
        // console.log(data);
        try {
            const response = await authApi.changePassword(
                data.password,
                params.token
            );
            console.log(response);
        } catch (error) {
            SnackbarUtils.error(
                'Não foi possível alterar a senha. Tente novamente.'
            );
        }
    };

    return (
        <>
            {!loading ? (
                <AuthLayout backButtonMessage="Voltar para o Login">
                    <Grid container>
                        <Grid item xs={12} sm={7}>
                            <Box mt={4}>
                                <Typography
                                    className={classes.title}
                                    color="primary"
                                >
                                    Recuperar Senha
                                </Typography>
                                <Typography className={classes.description}>
                                    Digite abaixo a nova senha para a conta:
                                </Typography>
                                <Typography className={classes.email}>
                                    {user ? user.email : email}
                                </Typography>
                                <form
                                    className={classes.form}
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <TextField
                                        className={classes.input}
                                        id="outlined-basic"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        label="Senha"
                                        InputProps={{
                                            startAdornment: (
                                                <Lock
                                                    size="20"
                                                    color="#B03E9F"
                                                />
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="trocar a visibilidade da senha"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                        onMouseDown={e =>
                                                            e.preventDefault()
                                                        }
                                                        style={{ width: 50 }}
                                                    >
                                                        {showPassword ? (
                                                            <EyeSlashIcon />
                                                        ) : (
                                                            <EyeIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
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
                                style={{
                                    width: '80%',
                                    minWidth: 260,
                                    height: 'auto',
                                }}
                                alt="Ilustração de um homem, com o dedo indicador no queixo, tentando lembrar a senha da conta"
                            />
                        </Grid>
                    </Grid>
                </AuthLayout>
            ) : (
                <h1>Carregando...</h1>
            )}
        </>
    );
};

export default RecoveryPassword;
