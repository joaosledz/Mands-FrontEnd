import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '21rem',
            padding: '1rem',
        },

        title: {
            color: theme.palette.primary.main,
            fontSize: '1.6rem',
            fontWeight: 500,
            textAlign: 'left',
        },

        assignContainer: {
            paddingTop: 0,
            maxHeight: '70%',
            overflowY: 'auto',
            justifyContent: 'center',
            alignItems: 'flex-start',

            '& .empty-data': {
                marginTop: '2.5rem',
                textAlign: 'center',
                color: 'gray',
            },
        },
    })
);

export default useStyles;
