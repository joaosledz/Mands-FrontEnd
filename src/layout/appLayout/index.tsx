import React from 'react';
import Box from '@material-ui/core/Box';

import Header from './components/header';

import useStyles from './styles';

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = props => {
    const { children } = props;
    const classes = useStyles();

    return (
        <Box component="main" className={classes.layout}>
            <Header />
            {children}
        </Box>
    );
};

export default AppLayout;
