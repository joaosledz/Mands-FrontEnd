import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        jobTitle: {
            color: theme.palette.primary.contrastText,
            fontSize: '1.3rem',
            fontWeight: 500,
        },
        backButton: {
            color: theme.palette.primary.contrastText,
        }
    })
);

export default useStyles;
