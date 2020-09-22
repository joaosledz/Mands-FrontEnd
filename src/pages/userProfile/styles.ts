import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: '100vw',
            height: '100vh',
            backgroundColor: theme.palette.primary.light,
        },
        paper: {
            height: '85vh',
            width: '90%',
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
        },
        title: {
            display: 'flex',
            alignSelf: 'center',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            margin: '10px auto',
        },
        subtitle1: {
            display: 'flex',
            alignSelf: 'begin',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            paddingLeft: '15px',
            fontSize: '32px',
            // margin: '10px auto',
        },
        subtitle2: {
            display: 'flex',
            alignSelf: 'begin',
            color: theme.palette.primary.main,
            fontWeight: 'lighter',
            paddingLeft: '15px',
            fontSize: '1.5em',
            // margin: '10px auto',
        },
        paragraph: {
            display: 'flex',
            textAlign: 'justify',
            alignSelf: 'begin',
            color: theme.palette.text.secondary,
            fontWeight: 'lighter',
            paddingLeft: '15px',
            fontSize: '22px',
            // margin: '10px auto',
        },
        socialMedia: {
            display: 'flex',
            alignSelf: 'begin',
            color: theme.palette.primary.main,
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
            // boxShadow: '2px 2px 7px black',
        },
    })
);

export default useStyles;
