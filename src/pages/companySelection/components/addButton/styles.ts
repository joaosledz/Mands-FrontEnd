import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addButtonContainer: {
            position: 'fixed',
            right: '1.3rem',
            bottom: '2rem',
        },

        addButton: {
            width: 45,
            height: 'auto',
        },
    })
);

export default useStyles;
