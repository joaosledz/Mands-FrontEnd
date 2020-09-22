import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            height: '100%',
            padding: '2rem 0',
            alignItems: 'center',
            position: 'relative',
        },

        logoContainer: {
            display: 'flex',
            justifyContent: 'center',
        },

        logo: {
            width: theme.spacing(9),
            height: theme.spacing(9),
            boxShadow: theme.shadows[3],
        },

        divider: {
            margin: theme.spacing(2, 0),
        },

        itemSelected: {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },

        itemIconContainer: {
            display: 'flex',
            justifyContent: 'center',
        },

        backButton: {
            width: '80%',
            margin: '0 auto',
            padding: '8px 1.5rem',

            color: theme.palette.primary.contrastText,
            textAlign: 'center',
            textTransform: 'none',
            backgroundColor: theme.palette.primary.light,
            boxShadow: theme.shadows[2],

            position: 'absolute',
            bottom: '2rem',
            left: 0,
            right: 0,

            transition: 'background-color .2s',

            '&:hover': {
                backgroundColor: theme.palette.primary.main,
            },
        },
    })
);

export default useStyles;
