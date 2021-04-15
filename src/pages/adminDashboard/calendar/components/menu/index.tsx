import React from 'react';

import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import useStyles from './styles';

const Index: React.FC = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <h3>Calendário</h3>
        </Paper>
    );
};

export default Index;
