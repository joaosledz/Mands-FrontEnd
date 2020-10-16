import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { TypeProjects } from '../../../../models/department';

import useStyles from './styles';

type Props = {
    project: TypeProjects;
};

const Project: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { project } = props;

    return (
        <Link
            component={RouterLink}
            to={{
                pathname: `/`,
                state: {
                    props: props,
                },
            }}
            className={classes.project}
        >
            <img src={project?.icon} alt="Ícone do projeto" />
            <Typography>{project?.name}</Typography>
        </Link>
    );
};

export default Project;
