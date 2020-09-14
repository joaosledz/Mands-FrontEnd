import React from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

interface ICompany {
    logo: string;
    name: string;
}

const Company: React.FC<ICompany> = ({ logo, name }) => {
    const classes = useStyles();

    return (
        <Link to="/" className={classes.container}>
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
