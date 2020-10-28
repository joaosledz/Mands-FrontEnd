import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontFamily: 'Roboto Slab',
            marginBottom: '12px',
            textAlign: 'justify',
            display: 'flex',
            alignSelf: 'begin',
            color: '#707070',
            fontWeight: 'lighter',
            fontSize: '1.2rem',
            width: '100%',
            height: '100%',
            overflowWrap: 'anywhere',
            resize: 'none',
        },
        mainDiv: {
            width: '100%',
            height: '100%',
            // clear: 'both',
            // paddingLeft: '6px',
            paddingBottom: '10px',
            marginBottom: '0px',
            overflowWrap: 'break-word',
        },
    })
);

export default useStyles;
