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
        paper: {
            width: '100%',
            maxWidth: '40vw',
            padding: '2rem 1rem',
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
        title: {
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            fontSize: '1.2rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '1.6rem',
            },
        },
        body: {
            position: 'relative',
        },
        personContainer: {
            backgroundColor: 'rgba( 191, 63 , 191, 0.5)',
            borderRadius: '20px',
            marginBottom: '5px',
        },
        subtitle: {
            display: 'flex',
            alignSelf: 'begin',
            justifyContent: 'flex-begin',
            color: theme.palette.primary.main,
            // fontWeight: 'bold',
            fontSize: '0.8rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '1rem',
            },
        },
        subtitle2: {
            display: 'flex',
            alignSelf: 'begin',
            justifyContent: 'flex-begin',
            color: theme.palette.primary.main,
            fontSize: '0.8rem',
            textDecoration: 'none',
            [theme.breakpoints.up('md')]: {
                fontSize: '1rem',
            },
            '&:hover': {
                // backgroundColor: 'rgba(70, 70, 70, 0.2)',
                cursor: 'pointer',
            },
        },

        smallAvatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        icon: {
            display: 'flex',
            color: theme.palette.primary.light,
            borderRadius: '20%',
            marginRight: '4px',
            maxWidth: '20px',
            alignSelf: 'center',
            '&:hover': {
                backgroundColor: 'rgba(70, 70, 70, 0.2)',
                cursor: 'pointer',
            },
        },
        iconMain: {
            display: 'flex',
            color: theme.palette.primary.light,
            position: 'absolute',
            right: '50%',
            top: '5px',
            borderRadius: '20%',
            marginRight: '4px',
            maxWidth: '36px',
            alignSelf: 'center',
        },
        iconClose: {
            color: theme.palette.text.secondary,
            borderRadius: '20%',
            marginRight: '4px',
            width: '2rem',
            position: 'absolute',
            right: '5px',
            top: '5px',
            '&:hover': {
                backgroundColor: 'rgba(70, 70, 70, 0.2)',
                cursor: 'pointer',
            },
        },
        scrollPerson: {
            // display: 'flex',
            width: '100%',
            padding: '15px 0 15px 15px',
            maxHeight: '250px',
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
        submitButton: {
            position: 'relative',
            paddingTop: '8px',
        },

        backdrop: {
            zIndex: theme.zIndex.modal + 1,
            color: 'white',
        },
    })
);

export default useStyles;
