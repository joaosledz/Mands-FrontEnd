import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: ' 1rem 2rem 0',
            padding: '2rem',

            [theme.breakpoints.only('xs')]: {
                margin: '0.5rem',
                padding: '1rem',
            },
        },

        title: {
            marginBottom: '2rem',
            color: theme.palette.primary.main,
            fontSize: '2rem',
            fontWeight: 600,
            textAlign: 'center',

            [theme.breakpoints.down('md')]: {
                fontSize: '1.75rem',
            },
        },

        formContainer: {
            [theme.breakpoints.down('sm')]: {
                marginTop: '1rem',
                justifyContent: 'center',
            },
        },

        cropImage: {
            marginTop: 0,
            '& label': {
                marginTop: 0,
            },
        },

        descriptionContainer: {
            marginTop: '1rem',
            [theme.breakpoints.up('md')]: {
                padding: '0 5.2rem 0 1rem',
            },
        },

        rightSide: {
            marginBottom: 69,

            '& #danger-zone-title': {
                marginBottom: '1rem',
                fontSize: '1.8rem',
                fontWeight: 400,
                color: theme.palette.text.secondary,
            },

            '& #danger-zone-container': {
                padding: '1rem',
                border: '1px solid #b1b1b1',
                borderRadius: 10,
            },

            '& h3': {
                fontSize: '1.3rem',
                color: theme.palette.text.secondary,
            },

            '& p': {
                margin: theme.spacing(1, 0),
                fontSize: '1rem',
                color: theme.palette.text.secondary,
            },

            [theme.breakpoints.only('xs')]: {
                margin: theme.spacing(8, 0, 1),

                '& p': {
                    fontSize: '0.8rem',
                },
            },
        },

        baseButton: {
            width: '100%',
            height: 50,
            maxWidth: 260,

            padding: '10px',

            borderRadius: '7px',

            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',

            [theme.breakpoints.up('sm')]: {
                marginTop: 20,
            },
        },

        button: {
            color: 'white',
            background:
                'linear-gradient(90deg, rgba(210,91,197,1) 0%, rgba(197,71,150,1) 48%)',

            transition: 'all .2s',

            '&:hover': {
                maxWidth: 300,
                background: `linear-gradient(to bottom,${theme.palette.primary.main} ,${theme.palette.primary.main})`,
            },
        },

        buttonDisabled: {
            backgroundColor: '#9a9a9a',
            '& p': {
                color: '#ffffffba',
            },
        },

        buttonText: {
            fontSize: 16,
            letterSpacing: 2.5,
        },

        deleteButton: {
            marginTop: '1rem',
            textTransform: 'initial',
            color: '#CD2A2A',
            transition: 'all .2s',

            '&:hover': {
                color: theme.palette.primary.contrastText,
                backgroundColor: '#CD2A2A',
            },
        },
    })
);

export default useStyles;
