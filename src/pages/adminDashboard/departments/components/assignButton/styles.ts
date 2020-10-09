import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            width: '3rem',
            height: '3rem',
            minWidth: 0,
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: '50%',
            position: 'relative',
            boxShadow: theme.shadows[2],

            '& #paper': {
                width: 20,
                height: 20,
                borderRadius: '50%',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                position: 'absolute',
                bottom: -1,
                right: -4,

                '& svg': {
                    verticalAlign: 'initial',
                },
            },

            '&:hover': {
                borderStyle: 'dashed',
            },
        },
    })
);

export default useStyles;
