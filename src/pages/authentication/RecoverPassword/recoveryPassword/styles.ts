import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        title: { fontSize: 40, fontWeight: 700 },

        description: {
            marginTop: 10,
            paddingRight: '15%',
            color: '#505050',
            fontSize: '1.1rem',
        },

        email: {
            marginTop: 10,
            paddingRight: '15%',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1.4rem',
        },

        form: {
            padding: '40px 0px',
            paddingRight: '15%',
        },

        rightSide: {
            marginTop: '4%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    })
);

export const inputStyle = {
    paddingLeft: 10,
    fontFamily: 'Roboto',
};

export default useStyles;
