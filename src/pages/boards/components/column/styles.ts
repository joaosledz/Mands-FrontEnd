import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontFamily: 'Roboto Slab',
            marginBottom: '12px',
            display: 'flex',
            alignSelf: 'begin',
            color: '#707070',
            fontWeight: 'lighter',
            fontSize: '1.3rem',
        },
        icon: {
            color: '#6E6E6E',
        },
        circle: {
            //div
            width: '25px',
            height: '25px',
            lineHeight: '25px',
            borderRadius: '50%',
            background: '#2B7D5B',
            alignSelf: 'center',
            marginTop: '5px',
            //Text
            fontFamily: 'Roboto',
            fontWeight: 'lighter',
            fontSize: '20px',
            textAlign: 'center',
            color: 'white',
        },
        BoardColumnWrapper: {
            flex: '1',
            padding: '8px',
            backgroundColor: '#e5eff5',
            maxWidth: '300px',
            minWidth: '300px',
            borderRadius: '4px',
            minHeight: '60vh',

            '& + &': {
                marginLeft: '12px',
            },
        },
        //     BoardColumnContent: {
        //         minHeight: "20px",
        // backgroundColor: ${props => (props.isDraggingOver ? '#aecde0' : null)},
        // borderRadius: "4px",
        // minHeight: "60vh",
        //     },
    })
);

export default useStyles;
