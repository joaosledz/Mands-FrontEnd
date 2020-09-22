import React from 'react';
import Box from '@material-ui/core/Box';

import Header from './components/header';

import useStyles from './styles';

interface AppLayoutProps {
    layoutStyles?: string;
}

const AppLayout: React.FC<AppLayoutProps> = props => {
    const { layoutStyles, children } = props;
    const classes = useStyles();

    return (
        <Box
            component="main"
            className={
                layoutStyles
                    ? ` ${layoutStyles} ${classes.layout}`
                    : classes.layout
            }
        >
            <Header />
            {children}
        </Box>
    );
};

export default AppLayout;
