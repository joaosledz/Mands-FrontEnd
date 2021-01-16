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
            maxWidth: '36%',
            minHeight: '60vh',
            margin: 'auto',
            display: 'flex',

            [theme.breakpoints.only('sm')]: {
                maxWidth: '70%',
            },

            [theme.breakpoints.only('xs')]: {
                maxWidth: '100%',
            },
        },

        contentContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',

            '& p': {
                fontSize: '1.3rem',
                fontFamily: 'Roboto',

                [theme.breakpoints.only('xs')]: {
                    fontSize: '1.1rem',
                },
            },

            '& button': {
                padding: '0.6rem 2rem',
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 10,

                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                },
            },
        },

        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: 'white',
        },
    })
);

export default useStyles;
