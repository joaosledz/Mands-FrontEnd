import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import Fab from '@material-ui/core/Fab';
import AppLayout from '../../layout/appLayout';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles';
import BackButton from '../../components/backButton';
import UserInfo from './components/userInfo';
// import { Container } from './styles';

const UserProfile: React.FC = () => {
    const classes = useStyles();
    return (
        <AppLayout>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={4} />
                    <Grid container item xs={4} justify="center">
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
                    <Grid xs={12} md={6} item>
                        <UserInfo />
                    </Grid>
                    <Grid xs={12} md={6} item></Grid>
                </Grid>
            </Paper>
        </AppLayout>
    );
};

export default UserProfile;
