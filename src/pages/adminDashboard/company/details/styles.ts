import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        paper: {
            margin: '2rem',
            padding: '2rem',

            [theme.breakpoints.only('xs')]: {
                margin: '0',
                padding: '2rem',
            },

            '& h1': {
                marginBottom: '4rem',
                fontSize: '1.8rem',
                fontWeight: 700,

                [theme.breakpoints.only('xs')]: {
                    marginBottom: '2rem',
                    fontSize: '1.3rem',
                },
            },

            '& form': {
                paddingBottom: '1rem',
            },
        },
        textField: {
            '& input:disabled': {
                color: '#727273',
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-disabled fieldset': {
                    borderColor: '#727273',
                },
            },
            '& label.Mui-disabled': {
                color: '#727273',
            },
        },
    })
);

export default useStyles;
