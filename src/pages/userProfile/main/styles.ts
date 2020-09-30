import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'relative',
            minHeight: '90vh',
            width: '93%',
            maxWidth: '1500px',
            // margin: '20px 30px',
            margin: '20px auto',
            borderRadius: '0px',
        },
        gridUser: {
            padding: '20px',
        },
        gridUserItems: {
            paddingBottom: '15px',
            paddingTop: '15px',
        },
        title: {
            display: 'flex',
            alignSelf: 'center',
            color: theme.palette.primary.light,
            fontWeight: 'bold',
            margin: '10px auto',
        },
        subtitle1: {
            display: 'flex',
            alignSelf: 'begin',
            color: theme.palette.primary.light,
            fontWeight: 'bold',
            fontSize: '1.8rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '2rem',
            },
        },
        subtitle2: {
            display: 'flex',
            alignSelf: 'begin',
            color: theme.palette.primary.light,
            fontWeight: 'lighter',
            fontSize: '1.3rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '1.6rem',
            },
        },
        paragraph: {
            display: 'flex',
            textAlign: 'justify',
            alignSelf: 'begin',
            color: 'black',
            fontWeight: 'lighter',
            fontSize: '22px',
            [theme.breakpoints.down('md')]: {
                // marginRight: 0,
                fontSize: '1rem',
            },
            // margin: '10px auto',
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
            transition: 'all .3s',
            '&:hover': {
                '& $smallAvatar, $socialMedia': {
                    color: theme.palette.primary.main,
                },
            },
        },
        UserDescriptionDiv: {
            paddingLeft: '0px',
            [theme.breakpoints.up(465)]: {
                // marginRight: 0,
                paddingLeft: '60px',
            },
        },
        largeAvatar: {
            alignSelf: 'center',
            width: theme.spacing(20),
            height: theme.spacing(20),
            borderSpacing: '3px',
            boxShadow: '2px 2px 7px black',
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
