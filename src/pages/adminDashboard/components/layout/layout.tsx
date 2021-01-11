import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Header from '../header';
import SideBar from '../sidebar';
import useStyles from './styles';

type Props = {
    title?: string;
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ title = 'Admin', children }) => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Header name={title} />
            <Grid container spacing={3}>
                <Grid item lg={2}>
                    <SideBar />
                </Grid>
                {children}
            </Grid>
        </Box>
    );
};

export default memo(Layout);
