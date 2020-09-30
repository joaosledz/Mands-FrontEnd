import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

type Props = {
    name: string;
};

const Header: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { name } = props;
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5" className={classes.title}>
                    {name}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Header;
