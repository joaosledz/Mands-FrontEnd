import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        root: {
            '&:hover': {
                backgroundColor: 'transparent',
                textAlign: 'flex-start',
            },
        },
        icon: {
            borderRadius: '50%',
            width: 16,
            height: 16,
            boxShadow:
                'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
            backgroundColor: '#f5f8fa',
            backgroundImage:
                'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
            '$root.Mui-focusVisible &': {
                outline: '2px auto rgba(19,124,189,.6)',
                outlineOffset: 2,
            },
            // 'input:hover ~ &': {
            //     backgroundColor: '#ebf1f5',
            // },
            'input:disabled ~ &': {
                boxShadow: 'none',
                background: 'rgba(206,217,224,.5)',
            },
        },
        checkedIcon: {
            backgroundColor: '#b3009b',
            backgroundImage:
                'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
            '&:before': {
                display: 'block',
                width: 16,
                height: 16,
                backgroundImage:
                    'radial-gradient(#fff,#fff 28%,transparent 32%)',
                content: '""',
            },
        },
        subtitle: {
            display: 'flex',
            alignSelf: 'begin',
            justifyContent: 'flex-begin',
            color: theme.palette.text.secondary,
            fontWeight: 'lighter',
            fontSize: '0.7rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '0.9rem',
            },
            paddingLeft: '21px',
        },
        divider: {
            margin: theme.spacing(1, 0),
        },
        addRole: {
            '&:hover': {
                backgroundColor: 'rgba(70, 70, 70, 0.2)',
                cursor: 'pointer',
            },
        },
        role: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        paper: {
            backgroundColor: '#FFF',
            padding: theme.spacing(1),
            borderRadius: 10,
            boxShadow:
                'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        },
        popper: {
            zIndex: 2000,
        },
    })
);

export default useStyles;
