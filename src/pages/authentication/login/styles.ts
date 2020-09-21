import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        form: {
            paddingRight: '15%',
        },

        rightSide: {
            marginTop: '4%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        input: {
            marginTop: 20,
        },

        ErrorMessage: {
            marginTop: 7,
            color: theme.palette.primary.main,
            '&:before': { content: "'⚠ '" },
        },

        forgotPasswordButton: {
            color: '#515151',
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: 300,
            textDecoration: 'none',

            transition: 'all .1s',

            '&:hover': {
                color: theme.palette.primary.main,
                textDecoration: 'underline',
            },
        },
        signUpText: {
            font: 'italic 300 16px Roboto',
            color: '#8A8A8A',
        },

        signUpButton: {
            marginLeft: 5,

            color: '#555',
            font: '16px Roboto Slab',
            textDecoration: 'none',

            transition: 'all .1s',

            '&:hover': {
                color: theme.palette.primary.main,
                textDecoration: 'underline',
            },
        },

        divider: {
            margin: theme.spacing(2, 0),
            width: '60%',
            minWidth: 300,
            border: '1px solid gray',
            opacity: 0.2,
        },
    })
);

export const inputStyle = {
    paddingLeft: 5,
    fontFamily: 'Roboto',
};

export default useStyles;
