import React from 'react';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

interface ICompany {
    logo: string;
    name: string;
}

const Company: React.FC<ICompany> = ({ logo, name }) => {
    const classes = useStyles();

    return (
        // Modificar "to" passando o nome da empresa e ID por props
        <Link
            component={RouterLink}
            to="/dashboard/IT"
            className={classes.container}
        >
            <Avatar
                src={logo}
                alt={`${name} logo`}
                className={classes.companyLogo}
            />
            <Typography className={classes.companyName}>{name}</Typography>
        </Link>
    );
};

export default Company;
