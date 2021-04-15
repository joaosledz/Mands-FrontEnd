import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: '#FFFFFF',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        lblHeader: {
            fontWeight: 700,
            color: theme.palette.primary.main,
            marginTop: theme.spacing(1),
            alignSelf: 'center',
        },
    })
);

export default useStyles;
