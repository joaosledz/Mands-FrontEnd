import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        paper: {
            width: '100%',
            maxWidth: '37vw',
            padding: '2rem 1rem',
            boxShadow: theme.shadows[5],

            position: 'fixed',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',

            [theme.breakpoints.down('md')]: {
                maxWidth: '90vw',
                padding: '2rem 0.2rem',
            },

            '& h1': {
                fontSize: '1.5rem',
                fontWeight: 300,
                color: theme.palette.text.secondary,

                [theme.breakpoints.down('md')]: {
                    fontSize: '1.4rem',
                },
            },
        },

        descriptionContainer: {
            margin: theme.spacing(2, 0, 3),
            textAlign: 'left',
            fontFamily: 'Roboto',

            '& p': {
                margin: theme.spacing(1, 0),
            },
        },

        textField: {
            fontFamily: 'Roboto',
        },

        button: {
            marginTop: '2rem',
            textTransform: 'initial',
            color: theme.palette.primary.contrastText,
            backgroundColor: '#CD2A2A',

            '&:hover': {
                backgroundColor: '#CD2A2A',
            },
        },

        disabledButton: {
            backgroundColor: 'white',
        },

        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: 'white',
        },
    })
);

export default useStyles;
