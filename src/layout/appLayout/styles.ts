import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: '100vw',
            height: '100%',
            minHeight: '100vh',
            maxWidth: '100%',
            paddingBottom: '1rem',
            backgroundColor: theme.palette.primary.light,
        },
    })
);

export default useStyles;
