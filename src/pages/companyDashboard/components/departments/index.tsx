import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Department from './components/department';
import DevIcon from '../../../../assets/selectableIcons/webPrograming.svg';
import useStyles from './styles';

interface IDepartments {
    containerStyles?: string;
}

const Departments: React.FC<IDepartments> = ({ containerStyles }) => {
    const classes = useStyles();
    return (
        <Paper
            className={
                containerStyles
                    ? `${containerStyles} ${classes.container}`
                    : classes.container
            }
        >
            <Typography className={classes.title}>Departamentos:</Typography>
            <Grid container className={classes.departmentsContainer}>
                <Grid item>
                    <Department name="Desenvolvedores" icon={DevIcon} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Departments;
