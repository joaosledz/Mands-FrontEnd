import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        paper: {
            width: '100%',
            maxWidth: '35vw',
            maxHeight: '80vh',
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
            
        },
        body: { 
                maxHeight: '400px',
                //Scroll
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
        icon: {
            color: theme.palette.primary.light,
            borderRadius: '20%',
            marginRight: '4px',
            maxWidth: '28px',
           
        },
        submitButton: {
            position: 'relative'
        },
    })
);

export default useStyles;
