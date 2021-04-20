import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// type props = {
//     isDraggingOver?: boolean;
// };
const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        title: {
            textAlign: 'center',
            fontSize: '0.7rem',
        },
        container: {
            boxSizing: 'border-box',
            backgroundColor: 'white',
            boxShadow: '0px 0px 3px #CBD4C2',
        },
        eventsList: {
            overflowY: 'auto',
            maxHeight: 100,
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
    })
);

export default useStyles;
