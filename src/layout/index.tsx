import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const Layout: React.FC = ({ children }) => {
    const classes = useStyles();

    return <Box className={classes.layout}>{children}</Box>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: '100vw',
            height: '100vh',
            backgroundColor: theme.palette.background.default,
        },
    })
);

export default Layout;
