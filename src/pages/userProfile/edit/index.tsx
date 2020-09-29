import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import Fab from '@material-ui/core/Fab';
import AppLayout from '../../../layout/appLayout';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles';
import BackButton from '../../../components/backButton';
import Avatar from '@material-ui/core/Avatar';
import ProfilePic from '../../../assets/avatar.png';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import RegisterButton from '../../../components/mainButton';
// import TextFieldError from './components/textField'
import CpfValidator from '../../../validators/cpfValidator';
import InputMask from 'react-input-mask';

const data = {
    id: 1,
    name: 'Ana Tartari Seindklmral',
    role: 'Coordenadora',
    email: 'tarta@gmail.com',
    telephone: '(71) 99556-8888',
    presentation:
        'Sou um desenvolvedor Full-Stack com foco no Front-End, graduando Ciência da Computação, com 1 ano de experiência em desenvolvimento web. Atualmente focado no aprendizado em desenvolvimento Web e Mobile com as tecnologias React, React Native e Node.Js',
    street: 'Rua Remanso',
    neighbourhood: 'Rio Vermelho',
    number: '489',
    city: 'Salvador',
    state: 'BA',
    cep: '41940-640',
    cpf: '946.436.290-10',
};

const UserProfile: React.FC = () => {
    const classes = useStyles();
    interface EditProfile {
        firstName: string;
        lastName: string;
        email: string;
        cpf: string;
        cel: string;
        password: string;
    }

    const { register, errors, handleSubmit } = useForm<EditProfile>();

    const onSubmit = (data: EditProfile) => {
        console.log(data);
    };
    return (
        <AppLayout>
            {console.log(typeof register)}
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid item xs={1} md={4} />
                        <Grid container item xs={7} md={4} justify="center">
                            <Typography className={classes.title} variant="h4">
                                Editar Perfil
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={4}
                            justify="flex-end"
                            style={{ paddingRight: '20px', paddingTop: '15px' }}
                        >
                            <BackButton redirect={'perfil'} message="Voltar" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.gridUser} container>
                        <Grid container direction="row">
                            <Grid item xs={12} md={2}>
                                <Avatar
                                    className={classes.largeAvatar}
                                    variant="square"
                                    src={ProfilePic}
                                />
                            </Grid>
                            <Grid container item xs={12} md={10} spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        name="firstName"
                                        label="Nome"
                                        color="primary"
                                        defaultValue={data.name}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="firstName"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputMask
                                        mask={'999.999.999-99'}
                                        maskChar="_"
                                        defaultValue={data.cpf}
                                    >
                                        {() => (
                                            <TextField
                                                name="cpf"
                                                label="CPF"
                                                fullWidth
                                                variant="outlined"
                                                inputRef={register({
                                                    required:
                                                        'Esse campo é obrigatório',
                                                    validate: {
                                                        cpfInvalido: value =>
                                                            CpfValidator(value),
                                                    },
                                                })}
                                            />
                                        )}
                                    </InputMask>
                                    <ErrorMessage
                                        errors={errors}
                                        name="cpf"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                CPF inválido
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        name="telefone"
                                        label="Telefone"
                                        color="primary"
                                        defaultValue={data.telephone}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="telefone"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        name="role"
                                        label="Cargo"
                                        color="primary"
                                        defaultValue={data.role}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="role"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        name="email"
                                        label="Email"
                                        color="primary"
                                        defaultValue={data.email}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="email"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.addressContainer}
                            container
                            xs={12}
                            md={6}
                            spacing={4}
                        >
                            <Grid item>
                                <Typography className={classes.subtitle1}>
                                    Endereço
                                </Typography>
                            </Grid>
                            <Grid xs={12} container item spacing={3}>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        name="street"
                                        label="Rua"
                                        color="primary"
                                        defaultValue={data.street}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="street"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        name="neighbourhood"
                                        label="Bairro"
                                        color="primary"
                                        defaultValue={data.neighbourhood}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="neighbourhood"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        name="number"
                                        label="Número"
                                        color="primary"
                                        defaultValue={data.number}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="number"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        name="state"
                                        label="Estado"
                                        color="primary"
                                        defaultValue={data.state}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="state"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        name="city"
                                        label="Cidade"
                                        color="primary"
                                        defaultValue={data.city}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="city"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        name="cep"
                                        label="CEP"
                                        color="primary"
                                        defaultValue={data.cep}
                                        fullWidth
                                        variant="outlined"
                                        inputRef={register({
                                            required:
                                                'Esse campo é obrigatório',
                                        })}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="cep"
                                        render={({ message }) => (
                                            <Typography
                                                className={classes.ErrorMessage}
                                            >
                                                {message}
                                            </Typography>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item>
                            <RegisterButton mt={40} text="Salvar Alterações" />
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </AppLayout>
    );
};

export default UserProfile;
