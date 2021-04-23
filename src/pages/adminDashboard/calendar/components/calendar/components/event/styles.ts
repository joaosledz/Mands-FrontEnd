import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            color: '#FFFFFF',
            fontSize: '0.8rem',
            fontFamily: 'Roboto Slab',
        },
    })
);

export default useStyles;
