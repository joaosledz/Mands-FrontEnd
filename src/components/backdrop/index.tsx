import React, { memo } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = {
    loading: boolean;
};

const BackdropComponent: React.FC<Props> = ({ loading }) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.modal + 1,
            color: 'white',
        },
    })
);

export default memo(BackdropComponent);
