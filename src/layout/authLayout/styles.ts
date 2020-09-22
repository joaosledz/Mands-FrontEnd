import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: '100vw',
            height: '100vh',
            maxWidth: '100%',
            backgroundColor: theme.palette.background.default,
            padding: '5% 10% 0px',
            // [theme.breakpoints.down('sm')]: {
            //     backgroundColor: 'blue',
            // },
        },

        logo: { width: '10%', minWidth: 130, height: 'auto' },
    })
);

export default useStyles;
