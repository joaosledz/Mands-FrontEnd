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

const departments = [
    {
        name: 'Desenvolvedores',
        icon: DevIcon,
    },
    {
        name: 'Financeiro',
        icon: DevIcon,
    },
    {
        name: 'Financeiro',
        icon: DevIcon,
    },
    {
        name: 'Financeiro',
        icon: DevIcon,
    },
    // {
    //     name: 'Financeiro',
    //     icon: DevIcon,
    // },
    // {
    //     name: 'Financeiro',
    //     icon: DevIcon,
    // },
];

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
            <Grid
                container
                spacing={3}
                className={classes.departmentsContainer}
            >
                {departments.map(department => (
                    <Grid item xs={12} sm={6} md={6}>
                        <Department
                            name={department.name}
                            icon={department.icon}
                        />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default Departments;
