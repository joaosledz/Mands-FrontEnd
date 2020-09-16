import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: '100vw',
            height: '100vh',
            backgroundColor: theme.palette.primary.light,
        },
    })
);

export default useStyles;
