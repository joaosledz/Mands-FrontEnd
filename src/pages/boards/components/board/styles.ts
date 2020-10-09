import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: 'flex',
            alignSelf: 'center',
            color: 'white',
            fontWeight: 'bold',
            margin: '10px auto',
        },
        boardElements: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'left',
        },
    })
);

export default useStyles;
