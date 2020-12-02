import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        paper: {
            width: '100%',
            maxWidth: '50vw',
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

            '& h2': {
                fontSize: '1.5rem',
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

        clearAssigns: {
            color: theme.palette.text.secondary,
            textTransform: 'initial',
            transition: 'all .2s',
            '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: '2rem',
                '& p': {
                    textDecoration: 'underline',
                },
            },
            '& svg': {
                marginRight: '0.5rem',
            },
        },

        employeesContainer: {
            margin: '0.5rem 0',
            '& #employees': {
                marginTop: '0.5rem',
                maxHeight: 300,
                '& p': {
                    color: '#303030',
                },
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                    width: '8px',
                    marginLeft: '12px',
                },
                /* Track */
                '&::-webkit-scrollbar-track': {
                    WebkitBorderRadius: '10px',
                    borderRadius: '10px',
                },
                /* Handle */
                '&::-webkit-scrollbar-thumb': {
                    WebkitBorderRadius: '10px',
                    borderRadius: '10px',
                    background: 'rgba(170,170,170,0.5)',
                },
            },
        },

        submitButton: {},
    })
);

export default useStyles;
