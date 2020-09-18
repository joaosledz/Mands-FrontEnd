import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
            padding: '1.5rem 5%',
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
        },
        divider: {
            margin: theme.spacing(2, 0),
        },
    })
);

export default useStyles;
