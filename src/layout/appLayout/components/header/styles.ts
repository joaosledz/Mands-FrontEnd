import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            height: 40,
            padding: '0px 20px',
            backgroundColor: theme.palette.primary.main,
            overflow: 'hidden',
        },

        logo: {
            display: 'flex',
            justifyContent: 'center',
            '& img': {
                width: '70%',
                margin: 'auto',
            },
        },

        rightSide: {
            alignItems: 'center',
            justifyContent: 'flex-end',

            '& p': {
                marginLeft: 10,
            },
        },

        avatar: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },

        menu: {
            '& li': {
                fontFamily: 'Roboto',
                textDecoration: 'none',
                color: 'black',
            },
        },
    })
);

export default useStyles;
