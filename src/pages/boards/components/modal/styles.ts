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
            // height: '100%',
            width: '100%',
            maxWidth: '40vw',
            // maxHeight: '90vh',
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
        body: {
            position: 'relative',
            // maxHeight: '70vh',
            //Scroll
            // overflowY: 'auto',
            // scrollbarWidth: 'thin',
            // '&::-webkit-scrollbar': {
            // width: '8px',
            // marginLeft: '12px',
            // },
            // /* Track */
            // '&::-webkit-scrollbar-track': {
            // WebkitBorderRadius: '10px',
            // borderRadius: '10px',
            // },
            // /* Handle */
            // '&::-webkit-scrollbar-thumb': {
            // WebkitBorderRadius: '10px',
            // borderRadius: '10px',
            // background: 'rgba(170,170,170,0.5)',
            // },
        },
        subtitle: {
            display: 'flex',
            alignSelf: 'begin',
            color: theme.palette.primary.light,
            fontWeight: 'lighter',
            fontSize: '0.8rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '1rem',
            },
        },
        notFoundText: {
            color: theme.palette.text.secondary,
            fontWeight: 'lighter',
            fontSize: '0.7rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '0.9rem',
            },
        },
        teamText: {
            paddingLeft: '0.8rem',
            display: 'flex',
            color: theme.palette.primary.light,
            fontWeight: 'lighter',
            fontSize: '0.5rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '0.7rem',
            },
        },
        smallAvatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        button: {
            '&:hover': {
                transform: 'scale(1.1)',
                transitionDuration: '0.2s',
            },
            cursor: 'pointer',
        },
        icon: {
            color: theme.palette.primary.light,
            borderRadius: '20%',
            marginRight: '4px',
            maxWidth: '28px',
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
        submitButton: {
            position: 'relative',
            paddingTop: '8px',
        },
    })
);

export default useStyles;
