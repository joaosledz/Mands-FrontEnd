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
import RegisterButton from '../../../components/authPagesButton';

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
                            <BackButton message="Voltar" />
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
                            <Grid item xs={12} md={10}>
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
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <RegisterButton mt={40} text="Criar conta" />
                    </Grid>
                </form>
            </Paper>
        </AppLayout>
    );
};

export default UserProfile;
