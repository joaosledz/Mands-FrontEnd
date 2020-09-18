import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        detailTitle: {
            marginRight: 5,
            color: theme.palette.text.secondary,
            fontSize: '1.2rem',
            fontWeight: 500,

            [theme.breakpoints.down('md')]: {
                // marginRight: 0,
                fontSize: '1.1rem',
            },
        },

        detailData: {
            fontSize: '1.2rem',
            fontWeight: 300,
            wordBreak: 'break-all',

            [theme.breakpoints.down('md')]: {
                fontSize: '1.1rem',
            },
        },
    })
);

export default useStyles;
