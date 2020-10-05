import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type ButtonProps = {
    mt?: number;
    mw?: number;
    mwt?: number;
};

const useStyles = makeStyles<Theme, ButtonProps>(theme =>
    createStyles({
        button: {
            width: '100%',
            height: 50,
            maxWidth: props => (props.mw ? props.mw : 260),
            marginTop: props => props.mt,
            padding: '10px',

            color: 'white',
            borderRadius: '7px',
            background:
                'linear-gradient(90deg, rgba(210,91,197,1) 0%, rgba(197,71,150,1) 48%)',

            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',

            transition: 'all .2s',

            '&:hover': {
                maxWidth: props => (props.mwt ? props.mwt : 300),
                background: `linear-gradient(to bottom,${theme.palette.primary.main} ,${theme.palette.primary.main})`,
            },
        },

        buttonText: {
            fontSize: 16,
            letterSpacing: 2.5,
        },
    })
);

export default useStyles;
