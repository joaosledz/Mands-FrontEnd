import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = {
    message: string;
};

const ErrorContent: React.FC<Props> = ({ message }) => {
    const classes = useStyles();
    return <Typography className={classes.ErrorMessage}>{message}</Typography>;
};

export default ErrorContent;

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        ErrorMessage: {
            marginTop: 7,
            color: theme.palette.primary.main,
            '&:before': { content: "'⚠ '" },
        },
    })
);
