import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import useStyles from './styles';

type Props = {
    name: string;
    icon: string;
    path: string;
};

const Department: React.FC<Props> = ({ name, icon, path }) => {
    const classes = useStyles();

    return (
        <Link component={RouterLink} to={path} className={classes.department}>
            <img src={icon} alt="Ícone do Departamento" />
            <Typography>{name}</Typography>
        </Link>
    );
};

export default Department;
