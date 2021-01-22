import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        user: {
            textDecoration: 'none',
            color: theme.palette.text.secondary,
            position: 'relative',
            transition: 'background-color .1s',
            textTransform: 'initial',
            alignItems: 'center',
            justifyContent: 'flex-start',

            '& p': {
                marginLeft: '1rem',
            },

            '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: '#00000026',
            },
        },

        removeButton: {
            width: 20,
            height: 20,
            padding: 5,
            color: 'white',
            backgroundColor: theme.palette.primary.light,
            position: 'absolute',
            top: 5,
            right: 3,
            transition: 'background-color .1s',

            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    })
);

export default useStyles;
