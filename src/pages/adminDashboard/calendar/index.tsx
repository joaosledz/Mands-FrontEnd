import React, { useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import Layout from '../layout/layout';
// import FabButton from '../../../components/fabButton';
import useStyles from './styles';

const Calendar: React.FC = () => {
    const classes = useStyles();
   // const history = useHistory();

    useEffect(() => {
        document.title = 'Admin - Eventos';
    }, []);

    return (
        <Layout title="Eventos">
            <Grid
                item
                xs={12}
                lg={9}
                //className={classes.departmentsContainer}
            >
           <FullCalendar
               plugins={[ dayGridPlugin ]}
               initialView="dayGridMonth"
               weekends={false}
               events={[
                 { title: 'event 1', date: '2020-04-12' },
                 { title: 'event 2', date: '2020-04-11' }
               ]}
               //className={classes.calendarBackground}
            />
            </Grid>
           
        </Layout>
    );
};

export default Calendar;
