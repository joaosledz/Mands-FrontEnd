import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
            height: '95vh',
        },
        menu: {
            backgroundColor: '#FFFFFF',
            borderRadius: 6,
            height: '100%',
        },
        calendar: {
            backgroundColor: '#FFFFFF',
            height: '100%',
        },
    })
);

export default useStyles;
