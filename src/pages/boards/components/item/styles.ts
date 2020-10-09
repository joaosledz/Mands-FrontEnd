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
        gridBoard: {
            position: 'relative',
            minHeight: '90vh',
            width: '93%',
            maxWidth: '1500px',
            // margin: '20px 30px',
            margin: '20px auto',
            borderRadius: '0px',
        },
        icon: {
            color: '#6E6E6E',
        },
        iconTask: {
            color: '#6E6E6E',
            width: '14px',
        },
        paper: {
            width: '100%',
            maxWidth: '50vw',
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
        taskTitle: {
            color: theme.palette.primary.main,
            fontWeight: 'lighter',
            fontFamily: 'Arvo',
        },
        members: {
            borderTop: '1px solid #cccccc',
        },
        memberName: {
            paddingRight: '3px',
            color: 'blue',
            fontFamily: 'Roboto slab',
            fontSize: '0.7rem',
        },
    })
);

export default useStyles;
