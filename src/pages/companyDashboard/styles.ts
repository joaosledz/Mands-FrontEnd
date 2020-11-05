import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: { overflowY: 'auto', overflowX: 'hidden' },

        container: {
            padding: ' 2rem 2rem 0',
            [theme.breakpoints.down('md')]: {
                padding: '1rem',
            },
        },

        name: {
            color: theme.palette.primary.contrastText,
            fontSize: '1.3rem',
            fontWeight: 'bold',
        },

        contentContainer: {
            marginTop: '1.5rem',
        },

        departments: {
            marginTop: '1.2rem',
        },
    })
);

export default useStyles;
