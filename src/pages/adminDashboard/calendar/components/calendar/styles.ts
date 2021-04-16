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
        fabButton: {
            [theme.breakpoints.up('md')]: {
                right: '4rem',
            },
        },
        fabButtonConfig: {
            [theme.breakpoints.up('md')]: {
                right: '8rem',
            },
        },
    })
);

export default useStyles;
