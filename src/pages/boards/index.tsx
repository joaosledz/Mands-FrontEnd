import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AppLayout from '../../layout/appLayout';
import useStyles from './styles';
import Typography from '@material-ui/core/Typography';
import Board from './components/board/board';
import Grid from '@material-ui/core/Grid';
import {BoardProvider} from '../../contexts/board'


const UserProfile: React.FC<RouteComponentProps> = ({ history }) => {
    const classes = useStyles();
    return (
        <AppLayout layoutStyles={classes.layout}>
            <Grid className={classes.gridBoard}>
                <Typography className={classes.title} variant="h4">
                    Board
                </Typography>
                <BoardProvider>
                    <Board />
                </BoardProvider>
            </Grid>
        </AppLayout>
    );
};

export default UserProfile;
