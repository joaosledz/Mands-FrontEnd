import React, { useEffect, Fragment, useState, useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import calendarContext from '../../context';
import { TypeDays, TypeEvent } from '../../models';
import useStyles from './styles';
import Day from './components/Day';
import moment from 'moment';
import { Typography } from '@material-ui/core';

type CalendarProps = {
    date: moment.Moment;
};

const Board: React.FC<CalendarProps> = props => {
    const { date } = props;
    const {
        onEventChange,
        state: { events, days },
        state,
        filter,
    } = useContext(calendarContext);
    const classes = useStyles();
    const weekDays = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
    ];
    const [slots, setSlots] = useState<TypeDays>({});
    const [slotsIds, setSlotsIds] = useState<Array<string>>([]);

    useEffect(() => {
        console.log(state);
    }, [state]);
    //First day of the month
    const firstDayOfMonth = (): number => {
        return parseInt(moment(date).startOf('month').format('d'));
    };

    //Update Grid
    useEffect(() => {
        if (!date) return;
        const auxDate = date;
        const ids: Array<string> = [];

        const previousMonth = auxDate.clone();
        previousMonth.subtract(1, 'month');
        const previousMonthDays = previousMonth.daysInMonth();
        let daysInPreviousMonth: TypeDays = {};
        for (
            let d = previousMonthDays - firstDayOfMonth() + 1;
            d <= previousMonthDays;
            d++
        ) {
            const dayId = `${d > 9 ? d : `0${d}`}/${
                previousMonth.month() + 1 > 9
                    ? previousMonth.month() + 1
                    : `0${previousMonth.month() + 1}`
            }/${previousMonth.year()}`;
            ids.push(dayId);
            daysInPreviousMonth = {
                ...daysInPreviousMonth,
                [dayId]: {
                    dayId: dayId,
                    eventsIds: days[dayId] ? days[dayId].eventsIds : [],
                },
            };
        }

        let daysInMonth: TypeDays = {};
        for (let d = 1; d <= auxDate.daysInMonth(); d++) {
            const dayId = `${d > 9 ? d : `0${d}`}/${
                auxDate.month() + 1 > 9
                    ? auxDate.month() + 1
                    : `0${auxDate.month() + 1}`
            }/${auxDate.year()}`;
            ids.push(dayId);
            daysInMonth = {
                ...daysInMonth,
                [dayId]: {
                    dayId: dayId,
                    eventsIds: days[dayId] ? days[dayId].eventsIds : [],
                },
            };
        }

        const nextMonth = auxDate.clone();
        nextMonth.add(1, 'month');
        let daysInNextMonth: TypeDays = {};
        const idsLength = ids.length;
        for (let d = 1; d < 43 - idsLength; d++) {
            const dayId = `${d > 9 ? d : `0${d}`}/${
                nextMonth.month() + 1 > 9
                    ? nextMonth.month() + 1
                    : `0${nextMonth.month() + 1}`
            }/${nextMonth.year()}`;
            ids.push(dayId);
            daysInNextMonth = {
                ...daysInNextMonth,
                [dayId]: {
                    dayId: dayId,
                    eventsIds: days[dayId] ? days[dayId].eventsIds : [],
                },
            };
        }

        setSlotsIds(ids);
        setSlots({
            ...daysInPreviousMonth,
            ...daysInMonth,
            ...daysInNextMonth,
        });
        // eslint-disable-next-line
    }, [date, days, events, state]);

    const onDragEnd = (result: any) => {
        const { source, destination, draggableId } = result;
        // Do nothing if event is dropped outside the list
        if (!destination) {
            return;
        }
        // Do nothing if the event is dropped into the same place
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        // Find day from which the event was dragged from
        const dayStart = (slots as any)[source.droppableId];

        // Find day in which the event was dropped
        const dayFinish = (slots as any)[destination.droppableId];

        // Moving events in the same list
        if (dayStart === dayFinish) {
            return;
        } else {
            // Moving events from one list to another
            // Get all event ids in source list
            const newStarteventsIds = Array.from(dayStart.eventsIds);

            // Remove the id of dragged event from its original position
            newStarteventsIds.splice(source.index, 1);

            // Create new, updated, object with data for source day
            const newDayStart = {
                ...dayStart,
                eventsIds: newStarteventsIds,
            };
            // Get all event ids in destination list
            const newFinisheventsIds = Array.from(dayFinish.eventsIds);

            // Insert the id of dragged event to the new position in destination list
            newFinisheventsIds.splice(destination.index, 0, draggableId);

            // Create new, updated, object with data for destination day
            const newDayFinish = {
                ...dayFinish,
                eventsIds: newFinisheventsIds,
            };
            // Create new board state with updated data for both, source and destination days
            const newSlots = {
                ...slots,
                [newDayStart.dayId]: newDayStart,
                [newDayFinish.dayId]: newDayFinish,
            };
            //Update the board state with new data
            onEventChange(newDayStart, newDayFinish, draggableId);
            setSlots(newSlots);
        }
    };

    return (
        <Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="all-days"
                    direction="horizontal"
                    type="day"
                    key="all-days"
                >
                    {provided => (
                        <div
                            className={classes.container}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <div className={classes.calendarGrid}>
                                {weekDays.map((event, index) => (
                                    <div key={index}>
                                        <Typography
                                            className={classes.dayName}
                                            variant="h6"
                                        >
                                            {event}
                                        </Typography>
                                    </div>
                                ))}
                                {/* Get all days in the order specified in slots' */}
                                {slotsIds.map((dayId, index) => {
                                    // Get id of the current day
                                    const day = slots[dayId];

                                    // Get events belonging to the current day
                                    const dayEvents: TypeEvent[] = [];
                                    day.eventsIds.forEach(eventId => {
                                        if (
                                            filter.includes(
                                                events[eventId].scheduleId
                                            )
                                        )
                                            dayEvents.push(events[eventId]);
                                    });

                                    // Render the CalendarDay component
                                    return (
                                        <React.Fragment key={index}>
                                            <Day
                                                key={day.dayId}
                                                day={day}
                                                events={dayEvents}
                                                index={index}
                                            />
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Fragment>
    );
};
export default Board;
