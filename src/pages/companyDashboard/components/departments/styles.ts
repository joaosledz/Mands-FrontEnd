import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '1.5rem 5%',
            backgroundColor: theme.palette.background.default,
            // [theme.breakpoints.down('sm')]: {
            //     padding: '1.5rem 2%',
            // },
        },

        title: {
            color: theme.palette.text.secondary,
            fontSize: '1.3rem',
            fontWeight: 300,
        },

        departmentsContainer: {
            margin: '2rem auto 1rem',
            maxHeight: '90vh',
            overflow: 'auto',

            [theme.breakpoints.down('sm')]: {
                margin: 0,
                fontSize: '0.8rem',
            },

            '& h6': {
                color: theme.palette.text.secondary,
                display: 'flex',
                justifyContent: 'center',

                [theme.breakpoints.down('sm')]: {
                    fontSize: '0.8rem',
                },
            },
        },
    })
);

export default useStyles;
