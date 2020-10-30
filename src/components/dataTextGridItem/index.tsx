import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

type Props = {
    title: string;
    data: string | undefined;
};

const DataText: React.FC<Props> = ({ title, data }) => {
    const classes = useStyles();
    return (
        <Grid container item xs={12}>
            <Typography className={classes.detailTitle}>{title}:</Typography>
            <Typography className={classes.detailData}>{data}</Typography>
        </Grid>
    );
};

export default memo(DataText);
