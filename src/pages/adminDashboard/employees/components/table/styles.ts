import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            backgroundColor: '#F5F5F5',
            paddingLeft: '18px',
            paddingTop: '7px',
            paddingBottom: '7px',
        },
        tableTitle: {
            color: theme.palette.text.secondary,
            fontFamily: 'Arvo',
            fontSize: '1.6rem',
        },
        button: {
            width: '90%',
            margin: '0 auto',
            padding: '8px 1.5rem',

            color: theme.palette.primary.contrastText,
            textAlign: 'center',
            textTransform: 'none',
            backgroundColor: theme.palette.primary.light,
            boxShadow: theme.shadows[2],

            transition: 'background-color .2s',

            '&:hover': {
                backgroundColor: theme.palette.primary.main,
            },
        },
        iconReload: {
            cursor: 'pointer',
            color: '#B03E9F',
            alignSelf: 'center',
            '&:hover': {
                transform: 'scale(1.1)',
                transitionDuration: '0.2s',
            },
        },
    })
);

export default useStyles;
