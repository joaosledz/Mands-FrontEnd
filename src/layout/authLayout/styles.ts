import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: '100vw',
            height: '100vh',
            backgroundColor: theme.palette.background.default,
            padding: '5% 10% 0px',
            // [theme.breakpoints.down('sm')]: {
            //     backgroundColor: 'blue',
            // },
        },

        logo: { width: '10%', minWidth: 130, height: 'auto' },

        backButton: {
            color: '#707070',
            fontFamily: 'Roboto slab',
            fontWeight: 500,
            textDecoration: 'none',

            transition: 'color .1s',

            '& svg': {
                marginRight: 5,
                transition: 'margin-right .2s',
            },
            '&:hover': {
                color: theme.palette.primary.main,
                textDecoration: 'underline',
                '& svg': {
                    marginRight: 9,
                },
            },
        },
    })
);

export default useStyles;
