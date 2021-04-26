import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
        },
        lblHeader: {
            fontWeight: 700,
            color: theme.palette.primary.main,
            marginTop: theme.spacing(1),
            alignSelf: 'center',
        },
        monthYear: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        popperContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(4, 1fr)',
        },
    })
);

export default useStyles;
