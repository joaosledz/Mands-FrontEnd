import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '1.5rem 5%',
            backgroundColor: theme.palette.background.default,
            [theme.breakpoints.down('sm')]: {
                padding: '1.5rem 1%',
            },
        },

        title: {
            color: theme.palette.text.secondary,
            fontSize: '1.3rem',
            fontWeight: 300,
        },

        departmentsContainer: {
            margin: '2rem auto 1rem',
            maxHeight: 300,
            overflow: 'auto',
        },
    })
);

export default useStyles;
