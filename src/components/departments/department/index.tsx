import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import Props from '../models/department';

import useStyles from './styles';

const Department: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { department, baseURL } = props;
    const { name, icon } = department;

    return (
        <Link
            component={RouterLink}
            to={{
                pathname: `/${baseURL}/${name.toLowerCase()}`,
                state: {
                    props: props,
                },
            }}
            className={classes.department}
        >
            <img src={icon} alt="Ícone do Departamento" />
            <Typography>{name}</Typography>
        </Link>
    );
};

export default Department;
