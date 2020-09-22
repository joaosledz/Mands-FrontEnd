import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../styles';
import Typography from '@material-ui/core/Typography';
import avatar from '../../../../assets/avatar.png';

// import { Container } from './styles';

const User: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid container direction="row" justify="center">
            <Grid item>
                <Avatar className={classes.largeAvatar} src={avatar} />
            </Grid>
            <Grid item>
                <Typography variant="h6" className={classes.subtitle2}>
                    Ana Tartari Seindeçro4
                </Typography>
                <Typography variant="subtitle1" className={classes.paragraph}>
                    Cargo: Coordenadora de projetos
                </Typography>
                <Typography className={classes.paragraph}>
                    Email: ana.tartari@gmail.com
                </Typography>
                <Typography className={classes.paragraph}>
                    Telefone: (71) 99557-4455
                </Typography>
            </Grid>
        </Grid>
    );
};

export default User;
