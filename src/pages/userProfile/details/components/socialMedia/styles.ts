import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        socialMedia: {
            paddingLeft: 5,
            color: 'gray',
            fontSize: '1rem',
            fontWeight: 300,
            textDecoration: 'none',

            display: 'flex',
            alignSelf: 'begin',
        },

        socialMediaDiv: {
            paddingRight: '20px',
            textDecoration: 'none',
        },

        socialMediaGrid: {
            color: 'gray',

            '& svg': {
                borderSpacing: '3px',
                transition: 'all .2s',
                [theme.breakpoints.down('md')]: {
                    width: theme.spacing(4),
                    height: theme.spacing(4),
                },
            },

            '& p': {
                transition: 'all .2s',
            },

            '&:hover': {
                '& svg, p': {
                    color: theme.palette.primary.main,
                },
            },
        },
    })
);

export default useStyles;
