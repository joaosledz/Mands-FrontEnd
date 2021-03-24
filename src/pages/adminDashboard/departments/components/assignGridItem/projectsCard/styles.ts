import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        project: {
            width: '100%',
            padding: '1rem',
            maxHeight: '7rem',

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

            [theme.breakpoints.up('lg')]: {
                '& img': {
                    maxWidth: '30%',
                },
                '& p': {
                    marginTop: '0.5rem',
                    color: theme.palette.primary.contrastText,
                    fontSize: '1.2rem',
                    fontWeight: 300,
                    textAlign: 'center',
                },
            },

            [theme.breakpoints.only('md')]: {
                '& img': {
                    maxWidth: '30%',
                },
                '& p': {
                    marginTop: '0.5rem',
                    color: theme.palette.primary.contrastText,
                    fontSize: '0.8rem',
                    fontWeight: 300,
                    textAlign: 'center',
                },
            },

            [theme.breakpoints.only('sm')]: {
                '& img': {
                    maxWidth: '10%',
                },
                '& p': {
                    marginTop: '0.5rem',
                    color: theme.palette.primary.contrastText,
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    textAlign: 'center',
                },
            },

            [theme.breakpoints.only('xs')]: {
                '& img': {
                    maxWidth: '10%',
                },
                '& p': {
                    marginTop: '0.5rem',
                    color: theme.palette.primary.contrastText,
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    textAlign: 'center',
                },
            },

            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    })
);

export default useStyles;
