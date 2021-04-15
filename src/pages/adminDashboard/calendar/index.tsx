import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import Layout from '../../../layout/appLayout';

import Menu from './components/menu';

const Calendar: React.FC = () => {
    const classes = useStyles();

    return (
        <Layout>
            <Box className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item lg={2}>
                        <Menu />
                    </Grid>
                    <Grid item lg={10}>
                        <Paper className={classes.calendar}>xs=12 sm=6</Paper>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default Calendar;
