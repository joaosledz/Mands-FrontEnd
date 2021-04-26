import React, { useState } from 'react';
import { CalendarProvider } from './context';

import CalendarGrid from './components/calendar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles';
import Layout from '../../../layout/appLayout';
import { schedules } from './Data/state';
import Menu from './components/menu';
import moment from 'moment';
import CreateEventModal from './components/calendar/components/modal/createEvent';

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
        <Layout>
            <CalendarProvider>
                <Box className={classes.container}>
                    <Grid container spacing={3} style={{ height: '100%' }}>
                        <Grid item lg={2} md={3}>
                            <Menu
                                date={date}
                                schedules={schedules}
                                onDateChange={setDate}
                            />
                        </Grid>
                        <Grid item lg={10} md={9}>
                            <Paper className={classes.calendar}>
                                <CalendarGrid date={date} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
                <Fab
                    style={{ position: 'fixed', right: '2rem', bottom: '2rem' }}
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
        </Layout>
    );
};

export default Calendar;
