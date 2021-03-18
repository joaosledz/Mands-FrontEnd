import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: ' 1rem 2rem 0',
            padding: '2rem',

            [theme.breakpoints.only('xs')]: {
                margin: '0.5rem',
            },
        },

        formContainer: {
            [theme.breakpoints.down('sm')]: {
                marginTop: '1rem',
                justifyContent: 'center',
            },
        },

        cropImage: {
            marginTop: 0,
            '& label': {
                marginTop: 0,
            },
        },

        descriptionContainer: {
            marginTop: '1rem',
            [theme.breakpoints.up('md')]: {
                padding: '0 5.2rem 0 1rem',
            },
        },

        assignsContainer: {
            marginTop: '2rem',
        },

        projectAssignGridItem: {
            [theme.breakpoints.down('sm')]: {
                marginTop: '2rem',
            },
        },

        textField: {
            '& input:disabled': {
                color: '#727273',
            },
            '& .MuiInputBase-inputMultiline:disabled': {
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
