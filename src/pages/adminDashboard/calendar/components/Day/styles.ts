import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// type props = {
//     isDraggingOver?: boolean;
// };
const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        title: {
            textAlign: 'center',
            fontSize: '0.9rem',
            padding: '0.2rem',
        },
        container: {
            boxSizing: 'border-box',
            backgroundColor: 'white',
            boxShadow: '0px 0px 3px #CBD4C2',
        },
    })
);

export default useStyles;
