import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(1),
            backgroundColor: '#FFFFFF',
            height: '100%',
        },
    })
);

export default useStyles;
