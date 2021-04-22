import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            borderRadius: '10px',
            height: '100%',
            padding: '1.5rem 5%',
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        },
        divider: {
            margin: theme.spacing(2, 0),
        },
        fabButton: {
            position: 'absolute',
            right: '15px',
            bottom: '15px',
        },
    })
);

export default useStyles;
