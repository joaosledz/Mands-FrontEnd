import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

import { Breakpoints } from './models/breakpoints';
import { TypeDepartment } from '../../../../services';

import Department from './department';
import useStyles from './styles';

interface Props {
    title?: string;
    departments: Array<TypeDepartment> | undefined;
    containerStyles?: string;
    breakpoints: Breakpoints;
}

const Departments: React.FC<Props> = (props: Props) => {
    const { departments, containerStyles, breakpoints } = props;
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
            <Typography className={classes.title}>Departamentos:</Typography>
            <Grid
                container
                spacing={3}
                className={classes.departmentsContainer}
            >
                {departments?.length !== 0 ? (
                    departments?.map((department, index) => {
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
                                <Grid key={index} item {...breakpoints}>
                                    <Department department={department} />
                                </Grid>
                            </Grow>
                        );
                    })
                ) : (
                    <Grid item xs={12} component={Typography} variant="h6">
                        Você não está em nenhum departamento{' '}
                        <span role="img" aria-label="Crying Face">
                            😢
                        </span>
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};

export default Departments;
