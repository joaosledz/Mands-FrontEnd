import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: ' 1rem 2rem 0',
            padding: '2rem',

            [theme.breakpoints.only('xs')]: {
                margin: '0.5rem',
            },
        },

        title: {
            marginBottom: '2rem',
            color: theme.palette.primary.main,
            fontSize: '1.6rem',
            fontWeight: 600,
            textAlign: 'center',

            [theme.breakpoints.down('sm')]: {
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

        submitButtonContainer: {
            marginTop: '1rem',
        },

        rightSide: {
            margin: theme.spacing(20, 0, 8),

            '& h2': {
                marginBottom: '1rem',
                fontSize: '1.8rem',
                fontWeight: 400,
                color: theme.palette.text.secondary,
            },

            '& #danger-zone-container': {
                padding: '1rem',
                border: '1px solid gray',
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

            '& button': {
                marginTop: '1rem',
                textTransform: 'initial',
                color: theme.palette.primary.contrastText,
                backgroundColor: '#CD2A2A',

                '&:hover': {
                    backgroundColor: '#A11313',
                },
            },

            [theme.breakpoints.only('xs')]: {
                margin: theme.spacing(8, 0, 1),

                '& p': {
                    fontSize: '0.8rem',
                },
            },
        },
    })
);

export default useStyles;
