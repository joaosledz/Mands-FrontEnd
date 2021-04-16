import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '1.5rem 2rem',
        },
        menu: {
            backgroundColor: '#FFFFFF',
            borderRadius: 6,
            height: '80vh',
        },
        calendar: {
            backgroundColor: '#FFFFFF',
            height: '86.3vh',
        },
    })
);

export default useStyles;
