import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            textDecoration: 'none',
            borderRadius: 10,
            textAlign: 'center',

            display: 'flex',
            flexDirection: 'column',

            transition: 'all .1s',

            backgroundColor: 'transparent',

            '&:hover': {
                border: '1px solid white',
                backgroundColor: 'rgba(0,0,0,.2)',
            },
        },

        content: {
            width: '100%',

            padding: '2.4rem 2rem',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        companyLogo: {
            width: theme.spacing(9),
            height: theme.spacing(9),
            color: 'white',
            backgroundColor: '#D0009C',
            boxShadow: theme.shadows[3],
        },

        companyName: {
            color: theme.palette.primary.contrastText,
            fontSize: '1.3rem',
            fontWeight: 300,
            textShadow: 'rgba(0,0,0,0.5) 2px 3px 6px',
        },

        quitButton: {
            position: 'absolute',
            alignSelf: 'flex-end',
            margin: '0.5rem',
        },
    })
);

export default useStyles;
