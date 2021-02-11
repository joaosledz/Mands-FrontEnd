import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import TypeParams from '../../../../models/params';
import { TypeProject } from '../../../../services';

import DefaultDepartmentIcon from '../../../../assets/selectableIcons/defaultProject.svg';
import useStyles from './styles';

type Props = {
    project: TypeProject;
};

const Project: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const { company, department } = params;
    const { project } = props;

    return (
        <Link
            component={RouterLink}
            to={`/${company}/${department}/quadro/${project.projectId}`}
            className={classes.project}
        >
            <img
                src={project.image || DefaultDepartmentIcon}
                alt="Ícone do projeto"
            />
            <Typography>{project.name}yyyyyyyy</Typography>
        </Link>
    );
};

export default Project;
