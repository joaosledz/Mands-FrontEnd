import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100vh',
            backgroundColor: theme.palette.primary.light,
            display: 'flex',
            flexDirection: 'column',
        },
        container: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(2),
            flex: 1,
        },
        calendar: {
            backgroundColor: '#FFFFFF',
            height: '100%',
        },
    })
);

export default useStyles;
