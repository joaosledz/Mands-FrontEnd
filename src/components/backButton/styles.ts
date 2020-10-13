import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = {
    white?: boolean;
}

const useStyles = makeStyles<Theme, Props>((theme) =>
    createStyles({
        backButton: {
            color: props => props.white ? theme.palette.primary.contrastText : '#707070',
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
                color: props => props.white ? '#D9D5D5' :theme.palette.primary.main,
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
