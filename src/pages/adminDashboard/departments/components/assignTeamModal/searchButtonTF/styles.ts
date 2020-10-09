import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        container: {
            marginTop: '1rem',
        },

        searchButton: {
            backgroundColor: theme.palette.primary.light,
            transition: 'background-color .2s',
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
            },
        },

        searchButtonContainer: {
            width: '2rem',
            opacity: 0,
            transition: 'width .2s, opacity .4s',
            '&:focus': {
                width: '100%',
                opacity: 1,
            },

            '&:hover': {
                width: '100%',
                opacity: 1,
            },
        },
    })
);

export default useStyles;
