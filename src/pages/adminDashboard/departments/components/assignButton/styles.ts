import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            width: '3rem',
            height: '3rem',
            minWidth: 0,
            padding: '1rem',
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: '50%',
            position: 'relative',
            boxShadow: theme.shadows[2],

            '& span': { width: 30 },

            '& #paper': {
                height: 20,
                borderRadius: '50%',
                position: 'absolute',
                bottom: 0,
                right: 0,

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
