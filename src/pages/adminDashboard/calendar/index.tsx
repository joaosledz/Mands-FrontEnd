import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import useStyles from './styles';
import Layout from '../../../layout/appLayout';

import Menu from './components/menu';

type ListItemType = {
    name: string;
    id: number;
    color: string;
};

const Calendar: React.FC = () => {
    const classes = useStyles();

    const departments: ListItemType[] = [
        {
            name: 'Desenvolvedores',
            id: 0,
            color: 'yellow',
        },
        {
            name: 'Designers',
            id: 1,
            color: 'green',
        },
        {
            name: 'Recursos Humanos',
            id: 2,
            color: 'orange',
        },
    ];
    const projects: ListItemType[] = [
        {
            name: 'projeto 1',
            id: 0,
            color: 'blue',
        },
        {
            name: 'projeto 2',
            id: 1,
            color: 'gray',
        },
        {
            name: 'projeto 3',
            id: 2,
            color: 'purple',
        },
    ];
    const company: ListItemType = {
        id: 0,
        name: 'Empresa X',
        color: 'red',
    };

    return (
        <Layout>
            <Box className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item lg={2}>
                        <Menu
                            departments={departments}
                            projects={projects}
                            company={company}
                        />
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
