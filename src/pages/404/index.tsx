import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NotFoundIllus from '../../assets/illustrations/404.svg';
import MandsLogo from '../../assets/logo/mands_branco.png';

import useStyles from './styles';

const NotFound: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid container direction="column" className={classes.container}>
            <Grid container className={classes.header}>
                <Grid item xs={6} />
                <Grid container item xs={6} justify="flex-end">
                    <Link to="/">
                        <img src={MandsLogo} alt="Logo do Mands" />
                    </Link>
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="center"
                spacing={3}
                className={classes.contentContainer}
            >
                <Grid container item xs={12} md={6} justify="center">
                    <img src={NotFoundIllus} alt="Ilustração do número 404" />
                </Grid>
                <Grid container item xs={12} md={6} alignItems="center">
                    <Typography variant="h1">
                        Esta não é a página que você está buscando.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NotFound;
