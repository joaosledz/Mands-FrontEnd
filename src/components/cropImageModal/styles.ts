import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface CropModalProps {
    maxWidth: number;
}

const useStyles = makeStyles<Theme, CropModalProps>(theme =>
    createStyles({
        paper: {
            width: '100%',
            maxWidth: props => props.maxWidth,
            padding: '10px 10px 10px',
            boxShadow: theme.shadows[5],

            position: 'fixed',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            // overflow: 'auto'
        },

        cropButton: {
            fontSize: '15px',
            margin: '20px 0px 10px',
        },
    })
);

export default useStyles;
