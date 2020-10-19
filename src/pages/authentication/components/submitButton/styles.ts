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
            maxWidth: props => (props.mw ? props.mw : 300),
            marginTop: props => props.mt,
            padding: '0px',

            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',

            transition: 'all .3s',

            '& #left-side': {
                width: 70,
                height: 60,

                borderRadius: '12px 0px 0px 12px',
                backgroundColor: theme.palette.primary.main,

                display: 'inherit',
                alignItems: 'inherit',
                justifyContent: 'center',
            },

            '& #right-side': {
                height: 60,

                color: 'white',
                textAlign: 'center',

                borderRadius: '0px 12px 12px 0px',
                backgroundColor: theme.palette.primary.light,

                flex: 1,
                display: 'inherit',
                alignItems: 'inherit',
                justifyContent: 'center',

                transition: 'all .3s',
            },

            '&:hover': {
                maxWidth: props => (props.mwt ? props.mwt : 360),
                '& #right-side': {
                    backgroundColor: theme.palette.primary.main,
                },
            },
        },

        logInText: {
            // fontFamily: 'Roboto',
            fontSize: 16,
            letterSpacing: 2.5,
            // fontWeight: 500,
        },
    })
);

export default useStyles;
