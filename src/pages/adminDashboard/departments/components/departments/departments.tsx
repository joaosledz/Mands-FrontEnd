import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { ApiProps as DepartmentProps } from '../../../../../models/department';

import Department from './department/department';
import useStyles from './styles';

interface Props {
    departments: Array<DepartmentProps>;
    containerStyles?: string;
}

const Departments: React.FC<Props> = (props: Props) => {
    const { departments, containerStyles } = props;
    const classes = useStyles();
    return (
        <Paper
            className={
                containerStyles
                    ? `${containerStyles} ${classes.container}`
                    : classes.container
            }
        >
            <Typography className={classes.title}>
                Selecione um departamento:
            </Typography>
            <Grid
                container
                spacing={3}
                className={classes.departmentsContainer}
            >
                {departments.map((department, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <Department department={department} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default Departments;
