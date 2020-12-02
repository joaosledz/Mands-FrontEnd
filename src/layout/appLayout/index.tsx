import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';

import Header from './components/header';
import Loading from '../../components/loading/loading';
import useStyles from './styles';
import useCompany from '../../hooks/useCompany';
import { useParams } from 'react-router-dom';
import snackbarUtils from '../../utils/functions/snackbarUtils';

type Props = {
    layoutStyles?: string;
    loading?: boolean | Array<boolean>;
    children: React.ReactNode;
};

const AppLayout: React.FC<Props> = (props: Props) => {
    const { layoutStyles, loading = false, children } = props;
    const classes = useStyles();
    const params = useParams<{ company: string }>();
    const {
        company,
        getCompanyData,
        loading: innerLoading,
        setLoading,
    } = useCompany();

    useEffect(() => {
        const checkCompanyData = async () => {
            if (!params.company) return;
            try {
                if (company) {
                    // Caso o usuário troque de empresa
                    if (
                        params.company.toLowerCase() !==
                        company.username.toLowerCase()
                    ) {
                        console.log('AppLayout: mudou url');
                        await getCompanyData(params.company);
                    } // Caso o usuário entre pela URL
                } else {
                    console.log('AppLayout: caso não tenha company');
                    await getCompanyData(params.company);
                }
            } catch (error) {
                console.error(error);
                const message = error.message.data;
                snackbarUtils.error(message ? message : error.message);
            } finally {
                setLoading(false);
            }
        };
        checkCompanyData();
    }, [company, getCompanyData, params.company, setLoading]);

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
            {typeof loading === 'boolean' ? (
                !loading || !innerLoading ? (
                    children
                ) : (
                    <Loading />
                )
            ) : loading.includes(true) && innerLoading ? (
                <Loading />
            ) : (
                children
            )}
        </Box>
    );
};

export default AppLayout;
