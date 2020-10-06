import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            marginBottom: '2rem',
            color: theme.palette.primary.main,
            fontSize: '1.6rem',
            fontWeight: 600,
            textAlign: 'center',

            [theme.breakpoints.down('sm')]: {
                fontSize: '1.75rem',
            },
        },
    })
);

export default useStyles;
