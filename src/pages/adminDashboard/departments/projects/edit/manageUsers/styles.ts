import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '21rem',
            padding: '1rem',
        },

        assignContainer: {
            flex: 1,
            padding: '1rem',
            marginBottom: '1rem',
            overflowY: 'auto',
            alignItems: 'flex-start',
            border: '1px solid #b1b1b1',
            borderRadius: 10,

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

            '& .empty-data': {
                marginTop: '2.5rem',
                textAlign: 'center',
                color: 'gray',
            },
        },

        header: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            '& h2': {
                color: theme.palette.primary.main,
                fontSize: '1.6rem',
                fontWeight: 500,
            },
        },
    })
);

export default useStyles;
