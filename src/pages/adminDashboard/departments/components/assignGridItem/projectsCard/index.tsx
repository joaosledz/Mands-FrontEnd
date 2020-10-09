import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { TypeProjects } from '../../../../../../models/department';

import useStyles from './styles';

type Props = {
    project: TypeProjects;
};

const ProjectsCard: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { project } = props;
    const { icon, name } = project;

    return (
        <Grid
            component={Link}
            to={`/`}
            item
            xs={12}
            md={6}
            className={classes.project}
        >
            <img src={icon} alt="Ícone do Projeto" />
            <Typography>{name}</Typography>
        </Grid>
    );
};

export default ProjectsCard;
