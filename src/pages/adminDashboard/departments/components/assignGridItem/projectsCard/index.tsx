import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { TypeProject } from '../../../../../../services';
import useProject from '../../../../../../hooks/useProject';
import DefaultDepartmentIcon from '../../../../../../assets/selectableIcons/defaultProject.svg';

import useStyles from './styles';

type Props = {
    project: TypeProject;
};

const ProjectsCard: React.FC<Props> = ({ project }) => {
    const classes = useStyles();
    const location = useLocation();
    const { updateProject } = useProject();
    const { image, name, projectId } = project;

    const handleDetailsURL = () => {
        const pages = ['/detalhes', '/edicao'];
        let baseURL = location.pathname;
        if (baseURL.includes(pages[0])) baseURL = baseURL.split(pages[0])[0];
        else baseURL = baseURL.split(pages[1])[0];

        const url = `${baseURL}/projeto/${projectId}/detalhes`;
        return url;
    };

    return (
        <Link
            component={RouterLink}
            to={{
                pathname: handleDetailsURL(),
                state: {
                    project,
                },
            }}
            className={classes.project}
            onClick={() => updateProject(project)}
        >
            <img src={image || DefaultDepartmentIcon} alt="Ícone do Projeto" />
            <Typography>{name}</Typography>
        </Link>
    );
};

export default ProjectsCard;
