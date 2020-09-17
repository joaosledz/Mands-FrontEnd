import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        detailContainer: {
            display: 'flex',
            alignItems: 'center',
        },

        detailTitle: {
            marginRight: 5,
            color: theme.palette.text.secondary,
            fontSize: '1.2rem',
            fontWeight: 500,
        },

        detailData: {
            fontSize: '1.2rem',
            fontWeight: 300,
        },
    })
);

export default useStyles;
