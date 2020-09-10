import React from 'react';
import Box from '@material-ui/core/Box';

import Header from './components/header';

import useStyles from './styles';

interface AuthLayoutProps {
    backButtonMessage?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = props => {
    const { backButtonMessage, /*message*/ children } = props;
    const classes = useStyles();

    return (
        <Box component="main" className={classes.layout}>
            <Header />
            {children}
        </Box>
    );
};

export default AuthLayout;
