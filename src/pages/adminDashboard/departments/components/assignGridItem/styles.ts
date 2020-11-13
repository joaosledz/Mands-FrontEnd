import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '21rem',
            padding: '1rem',
        },

        title: {
            color: theme.palette.primary.main,
            fontSize: '1.6rem',
            fontWeight: 500,
            textAlign: 'left',
        },

        assignContainer: {
            paddingTop: 0,
            maxHeight: '70%',
            overflowY: 'auto',
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
            justifyContent: 'center',
            alignItems: 'flex-start',

            '& .empty-data': {
                marginTop: '2.5rem',
                textAlign: 'center',
                color: 'gray',
            },
        },
    })
);

export default useStyles;
