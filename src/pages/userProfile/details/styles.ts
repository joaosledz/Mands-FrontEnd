import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            margin: '2rem',
            padding: '2rem',
            minHeight: '80vh',

            position: 'relative',

            '& h1': {
                fontSize: '2rem',
                fontWeight: 600,
            },

            [theme.breakpoints.only('xs')]: {
                margin: '1rem',
                padding: '.5rem',
            },
        },

        gridUser: {
            padding: '20px',
        },

        gridUserItems: {
            paddingTop: '1rem',

            '& h6': {
                marginBottom: '.3rem',
                fontSize: '1.6rem',
                fontWeight: 'bold',
            },

            '& p': {
                fontSize: '1rem',
                fontWeight: 300,
            },
        },

        socialMedia: {
            display: 'flex',
            alignSelf: 'begin',
            color: 'gray',
            fontWeight: 'lighter',
            paddingLeft: '5px',
            fontSize: '16px',
            textDecoration: 'none',
            // margin: '10px auto',
        },

        socialMediaDiv: {
            textDecoration: 'none',
            paddingRight: '20px',
        },

        socialMediaGrid: {
            color: 'gray',
            transition: 'all .2s',
            '&:hover': {
                '& $smallAvatar, $socialMedia': {
                    color: theme.palette.primary.main,
                },
            },
        },

        largeAvatar: {
            alignSelf: 'center',
            width: theme.spacing(20),
            height: theme.spacing(20),
            borderSpacing: '3px',
            boxShadow: '0px 3px 6px #00000029',
        },

        smallAvatar: {
            width: theme.spacing(6),
            height: theme.spacing(6),
            borderSpacing: '3px',
            [theme.breakpoints.down('md')]: {
                width: theme.spacing(3),
                height: theme.spacing(3),
            },
        },

        fabButton: {
            [theme.breakpoints.up('md')]: {
                right: '4rem',
            },
        },
    })
);

export default useStyles;
