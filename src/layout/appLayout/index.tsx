import React from 'react';
import Box from '@material-ui/core/Box';

import Header from './components/header';
import Loading from '../../components/loading/loading';
import useStyles from './styles';

type Props = {
    layoutStyles?: string;
    loading?: boolean;
    children: React.ReactNode;
};

const AppLayout: React.FC<Props> = (props: Props) => {
    const { layoutStyles, loading, children } = props;
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
            {!loading ? children : <Loading />}
        </Box>
    );
};

export default AppLayout;
