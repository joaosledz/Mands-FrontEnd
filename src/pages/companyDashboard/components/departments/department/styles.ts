import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        department: {
            width: '100%',
            maxWidth: '17rem',
            minWidth: 130,
            padding: '1.5rem',

            borderRadius: 10,
            backgroundColor: theme.palette.primary.main,
            boxShadow: theme.shadows[2],

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            transition: 'all .1s',

            '& img': {
                width: '3rem',
                height: 'auto',
            },

            '& p': {
                marginTop: '0.5rem',
                color: theme.palette.primary.contrastText,
                fontSize: '1.2rem',
                fontWeight: 300,
            },

            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                textDecoration: 'none',
            },
        },
    })
);

export default useStyles;
