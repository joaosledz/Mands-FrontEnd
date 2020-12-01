import React, { Fragment, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import useCompany from '../../../hooks/useCompany';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';

import AppLayout from '../../../layout/appLayout';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import useStyles from './styles';

type Props = {
    title?: string;
    menu?: boolean;
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({
    title = 'Admin',
    menu = false,
    children,
}) => {
    const classes = useStyles();
    const params = useParams<{ company: string }>();
    const history = useHistory();
    const { company, getCompanyData, loading, setLoading } = useCompany();

    useEffect(() => {
        const checkCompanyData = async () => {
            try {
                if (company && company.userPermission!.editCompany)
                    setLoading(false);
                // Caso o usuário entre pela URL
                else {
                    const response = await getCompanyData(params.company);
                    if (response && response.userPermission!.editCompany)
                        setLoading(false);
                    else history.push('/');
                }
            } catch (error) {
                SnackbarUtils.error(error.message.data);
                history.push('/');
            }
        };
        checkCompanyData();
    }, [company, history, params, getCompanyData, setLoading]);

    return (
        <AppLayout loading={loading}>
            {menu ? (
                <Box className={classes.container}>
                    <Header name={title} />
                    <Grid container spacing={3}>
                        <Grid item lg={2}>
                            <SideBar />
                        </Grid>

                        {children}
                    </Grid>
                </Box>
            ) : (
                <Fragment>{children}</Fragment>
            )}
        </AppLayout>
    );
};

export default Layout;
