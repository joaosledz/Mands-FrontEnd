import React, { useState } from 'react';
import { CalendarProvider } from './context';

import CalendarGrid from './components/calendar';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles';
import { schedules } from './Data/state';
import Menu from './components/menu';
import moment from 'moment';
import CreateEventModal from './components/calendar/components/modal/createEvent';
import Header from '../../../layout/appLayout/components/header';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const Calendar: React.FC = () => {
    const classes = useStyles();
    const [showCreateEventModal, setShowCreateEventModal] = useState<boolean>(
        false
    );
    const handleOpenEventCreate = () => {
        setShowCreateEventModal(true);
    };
    const [date, setDate] = useState(moment());

    return (
        <div className={classes.root}>
            <Header />
            <CalendarProvider>
                <div className={classes.container}>
                    <Hidden xsDown>
                        <Grid container spacing={3} style={{ height: '100%' }}>
                            <Hidden smDown>
                                <Grid item lg={2} md={3}>
                                    <Menu
                                        date={date}
                                        schedules={schedules}
                                        onDateChange={setDate}
                                    />
                                </Grid>
                            </Hidden>
                            <Grid item xs={12} lg={10} md={9}>
                                <Paper className={classes.calendar}>
                                    <CalendarGrid date={date} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Hidden>
                    <Hidden smUp>
                        <Paper className={classes.calendar}>
                            <CalendarGrid date={date} />
                        </Paper>
                    </Hidden>
                </div>

                <Fab
                    style={{
                        position: 'absolute',
                        right: '2rem',
                        bottom: '2rem',
                    }}
                    color="primary"
                    aria-label="add"
                    onClick={handleOpenEventCreate}
                >
                    <AddIcon />
                </Fab>
                <CreateEventModal
                    isOpen={showCreateEventModal}
                    setIsOpen={setShowCreateEventModal}
                />
            </CalendarProvider>
        </div>
    );
};

export default Calendar;
