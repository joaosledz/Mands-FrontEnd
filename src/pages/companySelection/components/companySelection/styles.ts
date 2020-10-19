import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        companiesContainer: { 
            padding: '2rem',         
            '& div:first-of-type': {
                marginBottom: '4rem'
            } 
        },

        title: {
            color: 'white',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            textShadow: 'rgba(0,0,0,0.5) 2px 3px 6px',
        },
    })
);

export default useStyles;
