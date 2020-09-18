import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
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
            <Box id="image-container" className={classes.imageContainer}>
                <img
                    src={logo}
                    alt={`${name} logo`}
                    style={{ width: '100%', objectFit: 'cover' }}
                />
            </Box>
            <Typography className={classes.companyName}>{name}</Typography>
        </Link>
    );
};

export default Company;
