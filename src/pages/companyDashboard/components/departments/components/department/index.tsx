import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

interface IDepartment {
    name: string;
    icon: string;
}

const Department: React.FC<IDepartment> = ({ name, icon }) => {
    const classes = useStyles();

    return (
        <Link component={RouterLink} to="/" className={classes.department}>
            <img src={icon} alt="Ícone do Departamento" />
            <Typography>{name}</Typography>
        </Link>
    );
};

export default Department;
