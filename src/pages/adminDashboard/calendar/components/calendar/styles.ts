import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: 'flex',
            alignSelf: 'center',
            color: 'white',
            fontWeight: 'bold',
            margin: '10px auto',
        },
        boardElements: {
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'left',
            overflowX: 'auto',
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
        dayName: {
            textAlign: 'center',
            fontWeight: 700,
            color: theme.palette.primary.main,
            marginTop: theme.spacing(1),
        },
        container: {
            width: '100%',
            height: '100%',
            padding: theme.spacing(1),
            display: 'flex',
        },
        calendarGrid: {
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridTemplateRows: '1fr 3fr 3fr 3fr 3fr 3fr 3fr',
        },
    })
);

export default useStyles;
