import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        modal: {
            // Scroll
            top: '0px',
            position: 'fixed',
            height: '100%',
            maxHeight: '100vh',
            overflowY: 'auto',
        },
        paper: {
            // height: '100%',
            width: '100%',
            maxWidth: '40vw',
            // maxHeight: '90vh',
            padding: '1rem 1rem',
            boxShadow: theme.shadows[5],

            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            top: '10%',
            textAlign: 'center',

            [theme.breakpoints.down('md')]: {
                maxWidth: '90vw',
                padding: '2rem 0.2rem',
            },
        },
        body: {
            position: 'relative',
        },
        title: {
            fontFamily: 'Roboto Slab',
            // marginBottom: '12px',
            textAlign: 'justify',
            display: 'flex',
            alignSelf: 'begin',
            color: '#707070',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            width: '100%',
            height: '100%',
            overflowWrap: 'anywhere',
            resize: 'none',
        },
        description: {
            fontFamily: 'Roboto Slab',
            paddingLeft: '3rem',
            // marginBottom: '12px',
            textAlign: 'justify',
            display: 'flex',
            alignSelf: 'begin',
            color: '#707070',
            fontWeight: 'normal',
            fontSize: '1rem',
            width: '100%',
            height: '100%',
            overflowWrap: 'anywhere',
            resize: 'none',
        },
        subtitle: {
            display: 'flex',
            alignSelf: 'begin',
            color: theme.palette.primary.light,
            fontWeight: 'bold',
            fontSize: '0.8rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '1rem',
            },
        },

        icon: {
            color: theme.palette.primary.light,
            borderRadius: '20%',
            marginRight: '4px',
            maxWidth: '28px',
        },
        headerIcon: {
            color: theme.palette.text.secondary,
            borderRadius: '20%',
            marginRight: '4px',
            width: '1.5rem',
            cursor: 'pointer',

            '&:hover': {
                backgroundColor: 'rgba(70, 70, 70, 0.2)',
            },
        },
    })
);

export default useStyles;
