import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

type Props = {
    name: string;
};

const Header: React.FC<Props> = ({ name }) => {
    const classes = useStyles();

    return (
        <Grid container component="section">
            <Grid item xs={6}>
                <Typography className={classes.name}>
                    Seja bem-vindo ao Mands, {name}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Header;
