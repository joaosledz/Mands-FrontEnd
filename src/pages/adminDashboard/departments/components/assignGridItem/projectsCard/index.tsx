import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { TypeProjects } from '../../../../../../models/department';
import handleUrlParamName from '../../../../../../utils/functions/handleUrlParamName';

import useStyles from './styles';

type Props = {
    project: TypeProjects;
};

const ProjectsCard: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { project } = props;
    const { icon, name } = project;
    const location = useLocation();

    const handleDetailsURL = () => {
        const pages = ['/detalhes', '/edicao'];
        let baseURL = location.pathname;
        if (baseURL.includes(pages[0])) baseURL = baseURL.split(pages[0])[0];
        else baseURL = baseURL.split(pages[1])[0];

        const url = `${baseURL}/projeto/${handleUrlParamName(name)}/detalhes`;
        return url;
    };

    return (
        <Link
            component={RouterLink}
            to={handleDetailsURL}
            className={classes.project}
        >
            <img src={icon} alt="Ícone do Projeto" />
            <Typography>{name}</Typography>
        </Link>
    );
};

export default ProjectsCard;
