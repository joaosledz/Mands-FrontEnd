import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '2rem',
        },

        departmentsContainer: {
            [theme.breakpoints.up('md')]: {
                marginTop: '2rem',
                marginLeft: '2rem',
            },
        },

        departmentsContentContainer: {
            height: '100%',
        },
    })
);

export default useStyles;
