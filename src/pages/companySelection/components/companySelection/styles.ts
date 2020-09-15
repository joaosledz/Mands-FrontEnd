import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            paddingTop: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
        },

        title: {
            color: 'white',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            textShadow: 'rgba(0,0,0,0.5) 2px 3px 6px',
        },

        companiesContainer: { marginTop: '3%', padding: '0px 15%' },
    })
);

export default useStyles;
