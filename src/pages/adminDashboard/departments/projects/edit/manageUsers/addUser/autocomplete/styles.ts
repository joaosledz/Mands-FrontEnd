import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(4),
                marginBottom: theme.spacing(4),
            },
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    })
);

export default useStyles;
