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
        paragraph: {
            display: 'flex',
            textAlign: 'justify',
            alignSelf: 'begin',
            color: 'black',
            fontWeight: 'lighter',
            fontSize: '22px',
            [theme.breakpoints.down('md')]: {
                // marginRight: 0,
                fontSize: '1rem',
            },
            // margin: '10px auto',
        },
    })
);

export default useStyles;
