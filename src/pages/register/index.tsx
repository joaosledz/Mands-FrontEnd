import React, { FormEvent } from 'react';
import Box from '@material-ui/core/Box';
// import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import { Camera as CameraIcon } from '@styled-icons/icomoon';

import AuthLayout from '../../layout/authLayout';
import TextField from './components/textField';
import RegisterButton from '../../components/authPagesButton';

import useStyles from './styles';

const Register: React.FC = () => {
    const classes = useStyles();
    return (
        <AuthLayout backButtonMessage="Voltar para o Login">
            <FormControl component="form" fullWidth>
                <Grid
                    component="article"
                    container
                    className={classes.container}
                >
                    <Grid item xs={12} sm={8}>
                        <Box mt={4}>
                            <Typography
                                style={{ fontSize: 40, fontWeight: 700 }}
                                color="primary"
                            >
                                Criar sua conta
                            </Typography>
                            <Grid
                                container
                                spacing={3}
                                style={{ marginTop: 20 }}
                            >
                                <Grid container item spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Nome" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Sobrenome" />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField type="email" label="Email" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="CPF" />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField label="Telefone" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            type="password"
                                            label="Senha"
                                        />
                                        <Typography
                                            component="span"
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 300,
                                            }}
                                        >
                                            Use 6 caracteres no mínimo
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid
                        component="aside"
                        className={classes.rightSide}
                        item
                        xs={12}
                        sm={4}
                    >
                        <Typography
                            component="label"
                            htmlFor="avatar-input"
                            style={{ color: '#505050' }}
                        >
                            Imagem do Perfil:
                        </Typography>
                        <Typography
                            component="label"
                            htmlFor="avatar-input"
                            className={classes.avatarInputLabel}
                        >
                            {/* {image ?
                        <>Preview da imagem</> 
                    : */}
                            <CameraIcon size="25" color="#B03E9F" />
                            {/* } */}
                            <input
                                id="avatar-input"
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                style={{ display: 'none' }}
                            />
                        </Typography>
                    </Grid>
                    <RegisterButton mt={40} text="Criar conta" />
                </Grid>
            </FormControl>
        </AuthLayout>
    );
};

export default Register;
