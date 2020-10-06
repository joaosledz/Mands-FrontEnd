import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            textDecoration: 'none',
            color: theme.palette.text.secondary,

            transition: 'background-color .1s',

            '& p': {
                marginLeft: '1rem',
            },

            '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: '#00000026',
            },
        },
    })
);

export default useStyles;
