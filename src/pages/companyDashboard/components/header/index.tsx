import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

interface ICompanyDashboardHeader {
    name: string;
    jobTitle: string;
}

const CompanyDashboardHeader: React.FC<ICompanyDashboardHeader> = props => {
    const { name, jobTitle } = props;
    const classes = useStyles();

    return (
        <Grid container component="section" className={classes.container}>
            <Grid item xs={6}>
                <Typography className={classes.name}>
                    Seja bem-vindo ao Mands, {name}
                </Typography>
            </Grid>
            <Grid item xs={6} className={classes.jobTitleContainer}>
                <Typography className={classes.jobTitle}>{jobTitle}</Typography>
            </Grid>
        </Grid>
    );
};

export default CompanyDashboardHeader;
