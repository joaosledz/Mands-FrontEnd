import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        paper: {
            width: '100%',
            maxWidth: '25vw',
            padding: '2rem 1rem',
            boxShadow: theme.shadows[5],

            position: 'fixed',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',

            [theme.breakpoints.down('md')]: {
                maxWidth: '35vw',
                //padding: '2rem 0.2rem',
            },
            [theme.breakpoints.down('sm')]: {
                maxWidth: '50vw',
                //padding: '2rem 0.2rem',
            },

            '& h1': {
                fontSize: '2rem',
                fontWeight: 500,
                color: theme.palette.primary.main,

                [theme.breakpoints.down('md')]: {
                    fontSize: '1.4rem',
                },
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
