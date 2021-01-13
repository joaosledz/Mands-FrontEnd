import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ErrorMessage: {
            marginTop: 7,
            color: theme.palette.primary.main,
            '&:before': { content: "'⚠ '" },
        },
    })
);

export default useStyles;
