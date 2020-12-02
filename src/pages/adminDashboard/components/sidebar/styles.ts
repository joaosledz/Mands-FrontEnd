import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '2rem',
            display: 'flex',
        },

        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },

        menuButton: {
            position: 'absolute',
            top: 0,
            [theme.breakpoints.up('lg')]: {
                display: 'none',
            },
        },

        drawerPaper: {
            width: drawerWidth,
        },

        drawerPaperPermanent: {
            width: drawerWidth,
            height: '76vh',

            borderRadius: 10,
            backgroundColor: theme.palette.background.default,

            position: 'initial',
        },
    })
);

export default useStyles;
