import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// type props = {
//     isDraggingOver?: boolean;
// };
const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        title: {
            fontFamily: 'Roboto Slab',
            // marginBottom: '12px',
            textAlign: 'justify',
            display: 'flex',
            alignSelf: 'begin',
            color: '#707070',
            fontWeight: 'bold',
            fontSize: '1.0rem',
            width: '100%',
            height: '100%',
            overflowWrap: 'anywhere',
            resize: 'none',
        },
        icon: {
            color: '#6E6E6E',
            borderRadius: '20%',
            marginRight: '4px',
            '&:hover': {
                backgroundColor: 'rgba(70, 70, 70, 0.2)',
                cursor: 'pointer',
            },
        },
        circle: {
            //div
            width: '25px',
            height: '25px',
            lineHeight: '25px',
            borderRadius: '50%',
            background: '#2B7D5B',
            alignSelf: 'center',
            //Text
            fontFamily: "'Roboto Slab'",
            fontWeight: 'normal',
            fontSize: '1.1 rem',
            textAlign: 'center',
            color: 'white',
        },

        // numbers: {
        //     //Text
        //     fontFamily: "'Roboto'",
        //     fontWeight: 'normal',
        //     fontSize: '20px',
        //     textAlign: 'center',
        //     color: 'white',
        // },
        BoardColumnWrapper: {
            flex: '1',
            padding: '8px',
            backgroundColor: '#e8d9eb',
            maxWidth: '300px',
            minWidth: '300px',
            height: '70vh',
            borderRadius: '4px',

            '& + &': {
                marginLeft: '12px',
            },
        },

        // BoardColumnContent: {
        //     backgroundColor: props =>
        //         props.isDraggingOver ? '#aecde0' : '#e5eff5',
        //     borderRadius: '4px',
        //     minHeight: '60vh',
        // },
    })
);

export default useStyles;
