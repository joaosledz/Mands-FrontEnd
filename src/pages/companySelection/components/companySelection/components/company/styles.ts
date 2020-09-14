import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            maxWidth: 300,
            padding: '1.2rem 1rem',
            textDecoration: 'none',
            borderRadius: 10,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',

            transition: 'all .1s',

            '&:hover': {
                border: '1px solid white',
                backgroundColor: 'rgba(0,0,0,.2)',
            },
        },

        imageContainer: {
            width: 80,
            borderRadius: 50,
            backgroundColor: '#F5F5F5',
        },

        companyName: {
            marginTop: 30,
            color: theme.palette.text.primary,
            fontSize: '1.3rem',
            fontWeight: 300,
        },
    })
);

export default useStyles;
