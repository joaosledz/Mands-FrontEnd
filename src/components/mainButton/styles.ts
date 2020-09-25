import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type ButtonProps = {
    mt?: number;
    mw?: number;
    mwt?: number;
    text: string;
    icon?: string;
};

const useStyles = makeStyles<Theme, ButtonProps>(theme =>
    createStyles({
        button: {
            width: '100%',
            maxWidth: props => (props.mw ? props.mw : 400),
            marginTop: props => props.mt,
            padding: '10px',

            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            height: 60,
            color: 'white',
            textAlign: 'center',

            borderRadius: '7px',
            background:
                'linear-gradient(90deg, rgba(210,91,197,1) 0%, rgba(197,71,150,1) 48%)',

            flex: 1,

            justifyContent: 'center',
            '&:hover': {
                maxWidth: props => (props.mwt ? props.mwt : 360),
                background: `linear-gradient(to bottom,${theme.palette.primary.main} ,${theme.palette.primary.main})`,
            },
        },

        buttonText: {
            fontSize: 16,
            letterSpacing: 2.5,
            // fontWeight: 500,
        },
    })
);

export default useStyles;
