import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: '100vw',
            height: '100vh',
            maxWidth: '100%',
            backgroundColor: theme.palette.primary.light,
        },
    })
);

export default useStyles;
