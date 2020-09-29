import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            height: 40,
            padding: '0px 20px',
            backgroundColor: theme.palette.primary.main,
            overflow: 'hidden',
        },
        logo: { width: 75 },
        rightSide: {
            alignItems: 'center',
            justifyContent: 'flex-end',

            '& img': {
                width: 36,
                height: 36,
                marginRight: 10,
                borderRadius: 20,
            },
        },
        menu: {
            '& li': {
                fontFamily: 'Roboto',
                textDecoration: 'none',
                color: 'black',
            },
        },
    })
);

export default useStyles;
