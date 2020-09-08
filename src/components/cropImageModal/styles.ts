import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        paper: {
            width: '100%',
            maxWidth: '600px',
            padding: '10px 10px 10px',

            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
        },

        cropButton: {
            fontSize: '15px',
            margin: '20px 0px 10px',
        },
    })
);

export default useStyles;
