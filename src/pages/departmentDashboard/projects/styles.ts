import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '1.5rem 5%',
            backgroundColor: theme.palette.background.default,
            [theme.breakpoints.only('xs')]: {
                padding: '1.5rem 1%',
            },
        },

        title: {
            color: theme.palette.text.secondary,
            fontSize: '1.3rem',
            fontWeight: 300,
            [theme.breakpoints.only('xs')]: {
                marginLeft: '1rem',
            },
        },

        projectsContainer: {
            marginTop: '1rem',
            minHeight: '55vh',
            maxHeight: '65vh',
            overflowY: 'auto',

            '& h6': {
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.text.secondary,
            },
        },
    })
);

export default useStyles;
