import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AppLayout from '../../layout/appLayout';
import useStyles from './styles';
import Typography from '@material-ui/core/Typography';
import { Board } from './components/board';
import Grid from '@material-ui/core/Grid';

const UserProfile: React.FC<RouteComponentProps> = ({ history }) => {
    const classes = useStyles();
    return (
        <AppLayout>
            <Grid className={classes.gridBoard}>
                <Typography className={classes.title} variant="h4">
                    Board
                </Typography>

                <Board />
            </Grid>
        </AppLayout>
    );
};

export default UserProfile;
