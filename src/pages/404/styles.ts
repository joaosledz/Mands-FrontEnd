import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        container: {
            width: '100vw',
            maxWidth: '100%',
            height: '100vh',
            padding: '2rem',
            backgroundColor: theme.palette.primary.main,
        },

        header: {
            maxHeight: '16vh',
            marginBottom: '4rem',

            [theme.breakpoints.down('md')]: {
                marginBottom: '7rem',
            },

            '& a': {
                display: 'flex',
                justifyContent: 'flex-end',

                '& img': {
                    width: '70%',
                    height: 'auto',
                    objectFit: 'contain',

                    [theme.breakpoints.only('xs')]: {
                        width: '50%',
                    },
                },
            },
        },

        contentContainer: {
            '& img': {
                width: '90%',
                height: 'auto',
            },

            '& h1': {
                marginTop: '2rem',
                color: theme.palette.primary.contrastText,
                fontSize: '2.8rem',
                fontWeight: '500',

                [theme.breakpoints.down('md')]: {
                    fontSize: '1.7rem',
                },
            },
        },
    })
);

export default useStyles;
