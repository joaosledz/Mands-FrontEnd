import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '1.5rem 2rem',
            backgroundColor: theme.palette.background.default,
        },

        title: {
            color: theme.palette.text.secondary,
            fontSize: '1.3rem',
            fontWeight: 300,
        },

        departmentsContainer: {
            marginTop: '2rem',
        },
    })
);

export default useStyles;
