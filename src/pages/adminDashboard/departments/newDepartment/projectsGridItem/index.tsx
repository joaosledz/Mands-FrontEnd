import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AssignButton from '../../components/assignButton';
import useStyles from './styles';

const ProjectsGridItem: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid
            component={Paper}
            container
            item
            xs={12}
            md={5}
            className={classes.container}
        >
            <Grid container item justify="space-between">
                <Grid item>
                    <Typography variant="h2" className={classes.title}>
                        Projetos:
                    </Typography>
                </Grid>
                <Grid item>
                    <AssignButton icon="document" actionIcon="add" />
                </Grid>
            </Grid>
            <Grid
                container
                item
                xs={12}
                justify="center"
                className={classes.projectsContainer}
            >
                <Grid item xs={9}>
                    <Typography>
                        Adicione projetos a este departamento pelo botão no
                        canto superior direito.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProjectsGridItem;
