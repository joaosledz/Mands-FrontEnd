import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { ArrowBack as ArrowBackIcon } from '@styled-icons/evaicons-solid';

import useStyles from './styles';

import logo from '../../assets/logo.svg';

interface AuthLayoutProps {
    backButtonMessage?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = props => {
    const { backButtonMessage, /*message*/ children } = props;
    const classes = useStyles();

    return (
        <Box component="main" className={classes.layout}>
            <Box className={classes.header}>
                <img src={logo} alt="Logo do Mands" className={classes.logo} />
                {backButtonMessage && (
                    <Link to={'/'} className={classes.backButton}>
                        <ArrowBackIcon size="25" />
                        {backButtonMessage}
                    </Link>
                )}
            </Box>
            {children}
        </Box>
    );
};

export default AuthLayout;
