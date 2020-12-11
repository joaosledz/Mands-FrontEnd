import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

import { TypeDepartment } from '../../../../../services';
import Department from './department/department';
import useStyles from './styles';
type Props = {
    departments: Array<TypeDepartment>;
    containerStyles?: string;
};

const Departments: React.FC<Props> = (props: Props) => {
    const { departments, containerStyles } = props;
    const classes = useStyles();
    let animationDelay = 50;

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
                {departments.map((department, index) => {
                    animationDelay += 100;
                    return (
                        <Grow
                            key={index}
                            in={true}
                            mountOnEnter
                            timeout={100 + animationDelay}
                            style={{
                                transitionDelay: `${animationDelay}ms`,
                            }}
                        >
                            <Grid key={index} item xs={12} sm={6} md={4}>
                                <Department department={department} />
                            </Grid>
                        </Grow>
                    );
                })}
            </Grid>
        </Paper>
    );
};

export default Departments;
