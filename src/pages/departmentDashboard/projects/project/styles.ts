import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        project: {
            width: '100%',
            padding: '1rem',

            textDecoration: 'none',

            borderRadius: 10,
            backgroundColor: theme.palette.primary.main,
            boxShadow: theme.shadows[2],

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'initial',

            transition: 'all .1s',

            '& img': {
                maxWidth: '30%',
            },

            '& p': {
                marginTop: '0.5rem',
                color: theme.palette.primary.contrastText,
                fontSize: '1.1rem',
                fontWeight: 300,
            },

            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    })
);

export default useStyles;
