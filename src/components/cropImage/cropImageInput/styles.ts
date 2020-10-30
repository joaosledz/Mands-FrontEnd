import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        avatarContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            '&.active': {
                transition: 'all .2s',
            },
        },

        avatarInputLabel: {
            width: '100%',
            maxWidth: '200px',
            height: '200px',
            marginTop: 10,

            border: '2px dashed #A2A2A2',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            position: 'relative',
            cursor: 'pointer',
            transition: 'all .2s',

            '& #avatar-blur': {
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,.2)',
                opacity: 0,
            },

            '& svg': {
                color: theme.palette.primary.main,
            },

            '&.active': {
                background: 'center no-repeat',
                backgroundSize: 'contain',

                '& svg': {
                    color: 'white',
                    transition: 'opacity .2s ease-in-out',
                    opacity: 0,
                    position: 'absolute',
                    zIndex: 5,
                },
                '&:hover': {
                    '& svg': {
                        opacity: 1,
                    },
                    '& #avatar-blur': {
                        opacity: 1,
                    },
                },
            },

            '&:hover': {
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.1)',
            },
        },
    })
);

export default useStyles;
