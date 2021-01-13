import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            margin: '2rem',
            padding: '2rem',
            minHeight: '80vh',

            position: 'relative',

            '& h1': {
                margin: theme.spacing(0, 0, 2),
                fontSize: '2rem',
                fontWeight: 600,
            },

            [theme.breakpoints.only('xs')]: {
                margin: '1rem',
                padding: '.5rem',
            },
        },

        gridUser: {
            padding: '20px',
        },

        gridUserItems: {
            paddingTop: '1rem',

            '& h6': {
                marginBottom: '.3rem',
                fontSize: '1.6rem',
                fontWeight: 'bold',
            },

            '& p': {
                fontSize: '1rem',
                fontWeight: 300,
            },
        },

        fabButton: {
            [theme.breakpoints.up('md')]: {
                right: '4rem',
            },
        },
    })
);

export default useStyles;
