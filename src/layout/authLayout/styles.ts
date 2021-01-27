import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: '100vw',
            height: '100%',
            minHeight: '100vh',
            maxWidth: '100%',
            backgroundColor: theme.palette.background.default,
            padding: '3% 10% 0px',
            [theme.breakpoints.down('md')]: {
                padding: '5% 2rem 0px',
            },
        },

        logo: { width: '65%', height: 'auto' },
    })
);

export default useStyles;
