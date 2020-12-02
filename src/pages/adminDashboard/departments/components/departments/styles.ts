import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '1.5rem 5%',
            backgroundColor: theme.palette.background.default,
            [theme.breakpoints.down('sm')]: {
                padding: '1.5rem 1%',
            },
        },

        title: {
            color: theme.palette.text.secondary,
            fontSize: '1.3rem',
            fontWeight: 300,
        },

        departmentsContainer: {
            margin: '1.5rem auto 1rem',
            maxHeight: '58vh',
            overflow: 'auto',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
                width: '8px',
                marginLeft: '12px',
            },
            /* Track */
            '&::-webkit-scrollbar-track': {
                WebkitBorderRadius: '10px',
                borderRadius: '10px',
            },
            /* Handle */
            '&::-webkit-scrollbar-thumb': {
                WebkitBorderRadius: '10px',
                borderRadius: '10px',
                background: 'rgba(170,170,170,0.5)',
            },
        },
    })
);

export default useStyles;
