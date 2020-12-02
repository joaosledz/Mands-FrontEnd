import React, { useEffect, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import CircularProgress from '@material-ui/core/CircularProgress';

import TypeParams from '../../../models/params';
import { TypeProject, projectApi } from '../../../services';

import Project from './project/project';
import useStyles from './styles';

const Projects: React.FC = () => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    let animationDelay = 50;

    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Array<TypeProject> | null>(null);

    useEffect(() => {
        setLoading(true);
        const getProjectData = async () => {
            try {
                const response = await projectApi.findByDepartment(
                    params.company,
                    params.department!
                );
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                //toast de erro
                setLoading(false);
            }
        };

        getProjectData();
    }, [params.company, params.department]);

    return (
        <Paper className={classes.container}>
            <Typography className={classes.title}>Projetos:</Typography>
            <Grid
                container
                justify="center"
                spacing={3}
                className={classes.projectsContainer}
            >
                {projects ? (
                    projects.length !== 0 ? (
                        projects.map((project, index) => {
                            animationDelay += 100;
                            return (
                                <Grow
                                    key={index}
                                    in={!loading}
                                    timeout={100 + animationDelay}
                                    style={{
                                        transitionDelay: `${animationDelay}ms`,
                                    }}
                                >
                                    <Grid
                                        container
                                        item
                                        justify="center"
                                        xs={12}
                                        sm={4}
                                    >
                                        <Project project={project} />
                                    </Grid>
                                </Grow>
                            );
                        })
                    ) : (
                        <Typography variant="h6">
                            Você não está em nenhum projeto{' '}
                            <span role="img" aria-label="Crying Face">
                                😢
                            </span>
                        </Typography>
                    )
                ) : (
                    <Grid container alignItems="center" justify="center">
                        <CircularProgress color="primary" />
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};

export default memo(Projects);
