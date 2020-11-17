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

        contentContainer: {
            marginTop: '1rem',
            [theme.breakpoints.down('md')]: {
                flexWrap: 'wrap-reverse',
            },
        },

        departments: {
            marginTop: '1.2rem',
        },
    })
);

export default useStyles;
