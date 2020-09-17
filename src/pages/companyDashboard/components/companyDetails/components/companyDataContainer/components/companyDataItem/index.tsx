import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

interface CompanyDataItemProps {
    title: string;
    data: string;
}

const CompanyDataItem: React.FC<CompanyDataItemProps> = ({ title, data }) => {
    const classes = useStyles();
    return (
        <Grid container item className={classes.detailContainer}>
            <Typography className={classes.detailTitle}>{title}:</Typography>
            <Typography className={classes.detailData}>{data}</Typography>
        </Grid>
    );
};

export default CompanyDataItem;
