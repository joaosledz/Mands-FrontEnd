import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        paper: {
            margin: '2rem',
            padding: '2rem',

            [theme.breakpoints.only('xs')]: {
                margin: '0 0.5rem 0.5rem',
                padding: '1rem',
            },

            '& form': {
                paddingBottom: '1rem',
            },
        },

        header: {
            alignItems: 'center',

            '& h1': {
                fontSize: '1.8rem',
                fontWeight: 700,

                [theme.breakpoints.only('xs')]: {
                    fontSize: '1.6rem',
                },
            },
        },

        dangerZone: {
            marginBottom: 89,
        },

        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: 'white',
        },

        textField: {
            '& input:disabled': {
                color: '#727273',
            },
            '& .MuiInputBase-inputMultiline:disabled': {
                color: '#727273',
            },
            '& label.Mui-disabled': {
                color: '#727273',
            },
        },
    })
);

export default useStyles;
