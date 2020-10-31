import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        UserDescription: {
            [theme.breakpoints.up(465)]: {
                paddingLeft: '60px',
            },

            '& h6, p': {
                [theme.breakpoints.down('md')]: {
                    marginBottom: '1rem',
                },
            },
        },
        avatar: {
            alignSelf: 'center',
            width: theme.spacing(20),
            height: theme.spacing(20),
            border: '2px solid white',
            boxShadow: '0px 3px 6px #00000029',
        },
    })
);

export default useStyles;
