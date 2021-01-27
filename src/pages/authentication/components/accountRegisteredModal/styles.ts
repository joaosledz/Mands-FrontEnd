import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        paper: {
            width: '100%',
            maxWidth: '36vw',
            padding: '2rem 1rem',
            boxShadow: theme.shadows[5],

            position: 'fixed',
            margin: 'auto',
            top: '7rem',
            left: 0,
            right: 0,

            [theme.breakpoints.down('md')]: {
                maxWidth: '90vw',
                padding: '2rem 0.2rem',
            },

            '& header': {
                marginBottom: '1rem',

                '& img': {
                    width: '15%',
                    height: 'auto',
                    marginLeft: 10,
                },
            },

            '& h1': {
                marginBottom: '1rem',
                fontSize: '1.5rem',
                fontWeight: 500,
                // color: theme.palette.primary.main,

                [theme.breakpoints.down('md')]: {
                    fontSize: '1.4rem',
                },
            },

            '& p': {
                marginBottom: '1rem',
                fontFamily: 'Roboto',
            },
        },

        closeModalButton: {
            position: 'absolute',
            top: '1%',
            right: '1%',
        },
    })
);

export default useStyles;
