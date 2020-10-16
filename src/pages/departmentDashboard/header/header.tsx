import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import BackButton from '../../../components/backButton';
import useStyles from './styles';

type Props = {
    jobTitle: string;
};

const CompanyDashboardHeader: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { jobTitle } = props;

    return (
        <Grid container component="section">
            <Grid item xs={6}>
                <Typography className={classes.jobTitle}>{jobTitle}</Typography>
            </Grid>
            <Grid container item justify="flex-end" xs={6}>
                <BackButton message="Voltar" white />
            </Grid>
        </Grid>
    );
};

export default CompanyDashboardHeader;
