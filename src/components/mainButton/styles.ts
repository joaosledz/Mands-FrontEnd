import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type ButtonProps = {
    mt?: number;
    mw?: number;
    mwt?: number;
    hg?: number;
};

const useStyles = makeStyles<Theme, ButtonProps>(theme =>
    createStyles({
        baseButton: {
            width: '100%',
            height: props => (props.hg ? props.hg : 50),
            maxWidth: props => (props.mw ? props.mw : 260),
            marginTop: props => props.mt,
            padding: '10px',

            borderRadius: '7px',

            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',

            [theme.breakpoints.down('sm')]: {
                marginBottom: props => props.mt,
            },
        },

        button: {
            color: 'white',
            background:
                'linear-gradient(90deg, rgba(210,91,197,1) 0%, rgba(197,71,150,1) 48%)',

            transition: 'all .2s',

            '&:hover': {
                maxWidth: props => (props.mwt ? props.mwt : 300),
                background: `linear-gradient(to bottom,${theme.palette.primary.main} ,${theme.palette.primary.main})`,
            },
        },

        buttonDisabled: {
            backgroundColor: '#9a9a9a',
            '& p': {
                color: '#ffffffba',
            },
        },

        buttonText: {
            fontSize: 16,
            letterSpacing: 2.5,
        },
    })
);

export default useStyles;
