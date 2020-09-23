import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Breakpoints } from './models/breakpoints';

import Department from './department';
import DevIcon from '../../assets/selectableIcons/webPrograming.svg';
import useStyles from './styles';

interface Props {
    title?: string;
    containerStyles?: string;
    breakpoints: Breakpoints;
}

const departments = [
    {
        name: 'Desenvolvedores',
        icon: DevIcon,
        path: '/',
    },
    {
        name: 'Financeiro',
        icon: DevIcon,
        path: '/',
    },
    {
        name: 'Financeiro',
        icon: DevIcon,
        path: '/',
    },
    {
        name: 'Financeiro',
        icon: DevIcon,
        path: '/',
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

const Departments: React.FC<Props> = (props: Props) => {
    const { title = 'Departamentos:', containerStyles, breakpoints } = props;
    const classes = useStyles();
    return (
        <Paper
            className={
                containerStyles
                    ? `${containerStyles} ${classes.container}`
                    : classes.container
            }
        >
            <Typography className={classes.title}>{title}</Typography>
            <Grid
                container
                spacing={3}
                className={classes.departmentsContainer}
            >
                {departments.map(department => (
                    <Grid item {...breakpoints}>
                        <Department
                            name={department.name}
                            icon={department.icon}
                            path={department.path}
                        />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default Departments;
