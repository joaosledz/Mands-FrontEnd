import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addButtonContainer: {
            position: 'absolute',
            right: '4%',
            bottom: '7%',
        },

        addButton: {
            width: 45,
            height: 'auto',
        },
    })
);

export default useStyles;
