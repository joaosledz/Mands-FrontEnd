import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '1.5rem 2rem',
            backgroundColor: theme.palette.background.default,
        },
    })
);

export default useStyles;
