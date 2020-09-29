import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '21rem',
            padding: '1rem',
        },

        title: {
            color: theme.palette.primary.main,
            fontSize: '1.6rem',
            fontWeight: 500,
            textAlign: 'left',
        },

        teamContainer: {
            '& p': { textAlign: 'center', color: 'gray' },
        },
    })
);

export default useStyles;
