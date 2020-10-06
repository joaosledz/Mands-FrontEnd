import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Breakpoints } from './models/breakpoints';
import { ApiProps as DepartmentProps } from './models/department';

import Department from './department';
import useStyles from './styles';

interface Props {
    title?: string;
    baseURL: string;
    departments: Array<DepartmentProps>;
    containerStyles?: string;
    breakpoints: Breakpoints;
}

const Departments: React.FC<Props> = (props: Props) => {
    const {
        title = 'Departamentos:',
        baseURL,
        departments,
        containerStyles,
        breakpoints,
    } = props;
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
                {departments.map((department, index) => (
                    <Grid key={index} item {...breakpoints}>
                        <Department department={department} baseURL={baseURL} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default Departments;
