import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            flex: 1,
            width: '100vw',
            height: '100%',
            maxWidth: '100%',
            backgroundColor: theme.palette.primary.light,
        },
    })
);

export default useStyles;
