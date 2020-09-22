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
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            position: 'absolute',
            top: 0,
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerPaperPermanent: {
            width: drawerWidth,
            height: '75vh',

            borderRadius: 10,
            backgroundColor: theme.palette.background.default,

            position: 'initial',
        },
    })
);

export default useStyles;
