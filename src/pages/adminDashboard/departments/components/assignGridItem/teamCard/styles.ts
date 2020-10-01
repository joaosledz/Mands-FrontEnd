import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '21rem',
            padding: '1rem',
        },

        name: {
            marginLeft: '1rem',
            textDecoration: 'none',
            color: theme.palette.text.secondary,
        },

        assignContainer: {
            '& p': { textAlign: 'center', color: 'gray' },
        },
    })
);

export default useStyles;
