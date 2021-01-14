import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            padding: '1.1rem 0px',

            borderRadius: 10,
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[2],

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            transition: 'all .1s',

            '& p': {
                color: '#5D5D5D',
                fontSize: '1.2rem',
                fontWeight: 300,
            },

            '&:hover': {
                backgroundColor: '#E4E4E4',
                textDecoration: 'none',
            },
        },

        image: {
            width: 40,
            marginBottom: 5,
        },
    })
);

export default useStyles;
