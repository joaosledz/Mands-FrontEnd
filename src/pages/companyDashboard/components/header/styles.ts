import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        name: {
            color: theme.palette.primary.contrastText,
            fontSize: '1.3rem',
            fontWeight: 'bold',
        },

        jobTitleContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
        },

        jobTitle: {
            color: theme.palette.primary.contrastText,
            fontSize: '1.3rem',
            fontWeight: 500,
        },
    })
);

export default useStyles;
