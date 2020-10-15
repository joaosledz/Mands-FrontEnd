import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { TypeProjects } from '../../../models/department';

import Project from './project/project';
import useStyles from './styles';

interface Props {
    projects: Array<TypeProjects> | undefined;
}

const Projects: React.FC<Props> = (props: Props) => {
    const { projects } = props;
    const classes = useStyles();
    return (
        <Paper className={classes.container}>
            <Typography className={classes.title}>Projetos:</Typography>
            <Grid
                container
                justify="center"
                spacing={3}
                className={classes.projectsContainer}
            >
                {projects?.map((project, index) => (
                    <Grid
                        key={index}
                        container
                        item
                        justify="center"
                        xs={12}
                        sm={4}
                    >
                        <Project project={project} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default Projects;
