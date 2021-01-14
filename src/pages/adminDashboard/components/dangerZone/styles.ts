import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(20, 0, 8),

            '& h2': {
                marginBottom: '1rem',
                fontSize: '1.8rem',
                fontWeight: 400,
                color: theme.palette.text.secondary,
            },

            '& #danger-zone-container': {
                padding: '1rem',
                border: '1px solid #b1b1b1',
                borderRadius: 10,
            },

            '& h3': {
                fontSize: '1.3rem',
                color: theme.palette.text.secondary,
            },

            '& p': {
                margin: theme.spacing(1, 0),
                fontSize: '1rem',
                color: theme.palette.text.secondary,
            },

            '& button': {
                marginTop: '1rem',
                textTransform: 'initial',
                color: '#CD2A2A',
                transition: 'all .2s',

                '&:hover': {
                    color: theme.palette.primary.contrastText,
                    backgroundColor: '#CD2A2A',
                },
            },

            [theme.breakpoints.only('xs')]: {
                margin: theme.spacing(8, 0, 1),

                '& p': {
                    fontSize: '0.8rem',
                },
            },
        },
    })
);

export default useStyles;
