import React, { useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Skeleton from '@material-ui/lab/Skeleton';

import { TypeDepartment } from '../../../../../services';
import Department from './department/department';
import useStyles from './styles';
type Props = {
    departments: Array<TypeDepartment>;
    containerStyles?: string;
    loading: boolean;
};

const Departments: React.FC<Props> = (props: Props) => {
    const { departments, containerStyles, loading } = props;
    const classes = useStyles();
    let animationDelay = 50;

    const renderDepartments = () =>
        departments.length !== 0 ? (
            departments.map((department, index) => {
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
            })
        ) : (
            <Grid container alignItems="center" justify="center">
                <Typography variant="h6">
                    Esta empresa não possui nenhum departamento{' '}
                    <span role="img" aria-label="Crying Face">
                        😢
                    </span>
                </Typography>
            </Grid>
        );

    const renderSkeleton = useCallback(
        () =>
            Array.apply(null, Array(9)).map((item, index) => (
                <Grid key={index} item xs={12} sm={4}>
                    <Skeleton variant="rect" height={112} />
                </Grid>
            )),
        []
    );

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
                {!loading ? renderDepartments() : renderSkeleton()}
            </Grid>
        </Paper>
    );
};

export default Departments;
