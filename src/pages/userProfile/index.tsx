import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import Fab from '@material-ui/core/Fab';
import AppLayout from '../../layout/appLayout';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles';
import BackButton from '../../components/backButton';
import UserInfo from './components/userInfo';
import SocialMedia from './components/socialMedia';
// import { Container } from './styles';

const UserProfile: React.FC = () => {
    const classes = useStyles();
    return (
        <AppLayout>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={1} md={4} />
                    <Grid container item xs={7} md={4} justify="center">
                        <Typography className={classes.title} variant="h4">
                            Meu Perfil
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
                        <Grid
                            xs={12}
                            md={5}
                            item
                            className={classes.gridUserItems}
                        >
                            <UserInfo />
                        </Grid>
                        <Grid xs={12} md={2} item />
                        <Grid
                            xs={12}
                            md={5}
                            item
                            className={classes.gridUserItems}
                        >
                            <SocialMedia />
                        </Grid>
                    </Grid>
                    <Grid container direction="row">
                        <Grid
                            xs={12}
                            md={5}
                            item
                            className={classes.gridUserItems}
                        >
                            <Typography className={classes.subtitle1}>
                                Apresentação
                            </Typography>
                            <Typography className={classes.paragraph}>
                                Sou um desenvolvedor Full-Stack com foco no
                                Front-End, graduando Ciência da Computação, com
                                1 ano de experiência em desenvolvimento web.
                                Atualmente focado no aprendizado em
                                desenvolvimento Web e Mobile com as tecnologias
                                React, React Native e Node.Js
                            </Typography>
                        </Grid>
                        <Grid xs={12} md={2} item />
                        <Grid
                            xs={12}
                            md={5}
                            item
                            className={classes.gridUserItems}
                        >
                            <Typography className={classes.subtitle1}>
                                Endereço
                            </Typography>
                            <Typography className={classes.paragraph}>
                                Rua Remanso, Rio Vermelho, 489, Salvador-BA,
                                41940-640
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default UserProfile;
