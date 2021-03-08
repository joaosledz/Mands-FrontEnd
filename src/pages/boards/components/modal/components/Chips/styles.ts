import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
        icon: {
            color: theme.palette.primary.light,
            borderRadius: '20%',
            marginRight: '4px',
            maxWidth: '28px',
        },
        addTeamIcon: {
            color: theme.palette.primary.light,
            borderRadius: '20%',
            marginRight: '4px',
            width: '20px',
            height: 'auto',
            display: 'inline-flex',
            '&:hover': {
                backgroundColor: 'rgba(70, 70, 70, 0.2)',
                cursor: 'pointer',
            },
        },
        subtitle: {
            display: 'flex',
            alignSelf: 'begin',
            color: theme.palette.primary.light,
            fontWeight: 'lighter',
            fontSize: '0.8rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '1rem',
            },
        },
        button: {
            '&:hover': {
                transform: 'scale(1.1)',
                transitionDuration: '0.2s',
            },
            cursor: 'pointer',
        },
    })
);

export default useStyles;
