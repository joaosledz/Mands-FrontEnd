import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Lottie from 'lottie-react';
import teamAnimation from '../../assets/animations/team.json';

type Props = {
    type?: 'whole' | 'inside';
};

const Loading: React.FC<Props> = ({ type = 'inside' }) => {
    const classes = useStyles();

    return (
        <Box
            className={[
                classes.container,
                type === 'inside'
                    ? classes.insideContainer
                    : classes.wholeContainer,
            ].join(' ')}
        >
            <Lottie animationData={teamAnimation} />
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            backgroundColor: '#5E2856',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        wholeContainer: {
            height: '100vh',
        },

        insideContainer: {
            height: '80vh',
            backgroundColor: '#B03E9F',
        },
    })
);

export default Loading;
