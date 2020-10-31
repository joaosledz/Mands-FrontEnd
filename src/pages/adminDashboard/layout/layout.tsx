import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import AppLayout from '../../../layout/appLayout';
import Header from '../components/header';
import SideBar from '../components/sidebar';

import useStyles from './styles';

type Props = {
    title: string;
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ title, children }) => {
    const classes = useStyles();
    return (
        <AppLayout>
            <Box className={classes.container}>
                <Header name={title} />
                <Grid container spacing={3}>
                    <Grid item lg={2}>
                        <SideBar />
                    </Grid>
                    {children}
                </Grid>
            </Box>
        </AppLayout>
    );
};

export default Layout;
