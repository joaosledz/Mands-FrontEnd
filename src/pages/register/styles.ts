import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        container: {
            padding: '0% 10% 0px',
        },

        rightSide: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },

        input: {
            marginTop: 20,
        },

        forgotPasswordButton: {
            color: '#515151',
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: 300,

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
            // fontSize: 16,
            font: '16px Roboto Slab',

            '&:hover': {
                color: theme.palette.primary.main,
                textDecoration: 'underline',
            },
        },

        avatarInputLabel: {
            width: '60%',
            height: '120px',
            marginTop: 10,

            border: '2px dashed #A2A2A2',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            cursor: 'pointer',
            transition: 'all .2s',

            '&:hover': {
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.1)',

                //     '&:before' {
                //         animation: 'spin 10s linear infinite;'
                //       },
                //       '@keyframes spin' {
                //         100% {
                //           transform: rotateZ(360deg);
                //         }
                //       }
            },
        },
    })
);

export default useStyles;
