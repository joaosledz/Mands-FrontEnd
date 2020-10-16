import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        paper: {
            width: '100%',
            maxWidth: '50vw',
            paddingTop: '2rem',

            boxShadow: theme.shadows[5],

            position: 'fixed',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',

            '& h1#iconModal-title': {
                fontSize: '1.7rem',
                fontWeight: 500,
                color: theme.palette.primary.main,
            },
        },

        iconsGridContainer: {
            // marginTop: '2rem',
            padding: '2rem',
        },

        iconGridItem: {
            maxWidth: 200,
            margin: theme.spacing(0, 1, 3),
            boxShadow: theme.shadows[3],
            transition: 'background-color .2s',
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
            },
        },
    })
);

export default useStyles;
