import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { TypeProject } from '../../../../services';

import DefaultDepartmentIcon from '../../../../assets/selectableIcons/defaultProject.svg';
import useStyles from './styles';

type Props = {
    project: TypeProject;
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
            <img
                src={project.image || DefaultDepartmentIcon}
                alt="Ícone do projeto"
            />
            <Typography>{project.name}</Typography>
        </Link>
    );
};

export default Project;
