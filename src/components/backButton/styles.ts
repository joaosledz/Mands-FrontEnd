import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backButton: {
            color: '#707070',
            fontFamily: 'Roboto slab',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'flex',

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

        button: {
            marginBottom: '1.8rem',
        },
    })
);

export default useStyles;
