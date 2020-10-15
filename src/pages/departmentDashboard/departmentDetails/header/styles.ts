import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        button: {
            '& img': {
                width: theme.spacing(9),
                height: theme.spacing(9),
                marginRight: '1rem',
                // objectFit: 'contain',
    
                [theme.breakpoints.down('md')]: {
                    width: theme.spacing(6),
                    height: theme.spacing(6),
                    marginRight: '0.5rem',
                },
            },

            '& svg': {
                width: theme.spacing(4),
                height: theme.spacing(4),

                [theme.breakpoints.down('md')]: {
                    width: theme.spacing(3),
                    height: theme.spacing(3),
                },
            },

            '& h5': {
                color: '#505050',
                fontWeight: 500,
                textTransform: 'none',

                [theme.breakpoints.down('md')]: {
                    fontSize: '1.1rem',
                },
            },
        },
    })
);

export default useStyles;
