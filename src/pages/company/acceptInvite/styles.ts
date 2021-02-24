import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        container: {
            width: '100vw',
            maxWidth: '100%',
            height: '100vh',
            padding: '2rem',
            backgroundColor: theme.palette.background.default,

            [theme.breakpoints.down('md')]: {
                padding: '1rem',
            },
        },

        cardContainer: {
            maxWidth: '45%',
            minHeight: '40vh',
            margin: 'auto',

            [theme.breakpoints.up('md')]: {
                maxWidth: '36%',
            },

            [theme.breakpoints.only('sm')]: {
                maxWidth: '70%',
            },

            [theme.breakpoints.only('xs')]: {
                maxWidth: '100%',
            },
        },

        contentContainer: {
            padding: '2rem',

            [theme.breakpoints.down('md')]: {
                padding: '1rem',
            },

            '& h1': {
                font: '2.3rem Roboto Medium',

                [theme.breakpoints.only('xs')]: {
                    fontSize: '1.9rem',
                },
            },

            '& p': {
                fontSize: '1.3rem',
                fontFamily: 'Roboto',
            },

            '& #buttons-container': {
                marginTop: '2rem',
            },
        },

        acceptButton: {
            padding: '0.6rem 2rem',
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 10,
            textTransform: 'capitalize',

            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },

        declineButton: {
            padding: '0.5rem 2rem',
            boxShadow: theme.shadows[3],
            color: '#555',
            textTransform: 'capitalize',
        },

        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: 'white',
        },
    })
);

export default useStyles;
