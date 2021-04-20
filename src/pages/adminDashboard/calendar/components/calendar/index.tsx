import React, { useEffect, Fragment, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TypeDays, TypeEvents, TypeEvent } from '../../models';
import useStyles from './styles';
import Day from './components/Day';
// import snackbarUtils from '../../../../../utils/functions/snackbarUtils';
import moment from 'moment';
import { Typography } from '@material-ui/core';

type CalendarProps = {
    date: moment.Moment;
    events: TypeEvents;
    days: TypeDays;
};

const Board: React.FC<CalendarProps> = props => {
    const { date, events, days } = props;

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

    //Primeiro dia do mês
    const firstDayOfMonth = (): number => {
        return parseInt(moment(date).startOf('month').format('d'));
    };

    //Pega os dias do mês
    useEffect(() => {
        if (!date) return;
        const auxDate = date;
        const ids: Array<string> = [];

        const previousMonth = auxDate.clone();
        previousMonth.subtract(1, 'month');
        const previousMonthDays = previousMonth.daysInMonth();
        let daysInPreviousMonth: TypeDays = {};
        for (
            let i = previousMonthDays - firstDayOfMonth() + 1;
            i <= previousMonthDays;
            i++
        ) {
            const dayId = `${i}/${
                previousMonth.month() + 1
            }/${previousMonth.year()}`;
            ids.push(dayId);
            daysInPreviousMonth = {
                ...daysInPreviousMonth,
                [dayId]: {
                    dayId: dayId,
                    title: i.toString(),
                    eventsIds: days[dayId] ? days[dayId].eventsIds : [],
                },
            };
        }

        let daysInMonth: TypeDays = {};
        for (let d = 1; d <= auxDate.daysInMonth(); d++) {
            const dayId = `${d}/${auxDate.month() + 1}/${auxDate.year()}`;
            ids.push(dayId);
            daysInMonth = {
                ...daysInMonth,
                [dayId]: {
                    dayId: dayId,
                    title: d.toString(),
                    eventsIds: days[dayId] ? days[dayId].eventsIds : [],
                },
            };
        }

        const nextMonth = auxDate.clone();
        nextMonth.add(1, 'month');
        let daysInNextMonth: TypeDays = {};
        const idsLength = ids.length;
        for (let i = 1; i < 43 - idsLength; i++) {
            const dayId = `${i}/${nextMonth.month() + 1}/${nextMonth.year()}`;
            ids.push(dayId);
            daysInNextMonth = {
                ...daysInNextMonth,
                [dayId]: {
                    dayId: dayId,
                    title: i.toString(),
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
    }, [date]);

    const onDragEnd = (result: any) => {
        const { source, destination, draggableId } = result;
        // Do nothing if item is dropped outside the list
        if (!destination) {
            return;
        }
        // Do nothing if the item is dropped into the same place
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        // Find column from which the item was dragged from
        const columnStart = (slots.days as any)[source.droppableId];

        // Find column in which the item was dropped
        const columnFinish = (slots.days as any)[destination.droppableId];

        // Moving events in the same list
        if (columnStart === columnFinish) {
            // Get all item ids in currently active list
            const neweventsIds = Array.from(columnStart.eventsIds);
            // Remove the id of dragged item from its original position
            neweventsIds.splice(source.index, 1);
            // Insert the id of dragged item to the new position
            neweventsIds.splice(destination.index, 0, draggableId);
            // Create new, updated, object with data for days
            // const newColumnStart = {
            //     ...columnStart,
            //     eventsIds: neweventsIds,
            // };
            // Create new board state with updated data for days
            // const newState = {
            //     ...state,
            //     days: {
            //         ...state.days,
            //         [newColumnStart.sessionId]: newColumnStart,
            //     },
            // };
            // Update the board state with new data
            // setState(newState);
            // MoveTaskSocket(newState, state, destination.droppableId);
        } else {
            // Moving events from one list to another
            // Get all item ids in source list
            const newStarteventsIds = Array.from(columnStart.eventsIds);

            // Remove the id of dragged item from its original position
            newStarteventsIds.splice(source.index, 1);

            // Create new, updated, object with data for source column
            // const newColumnStart = {
            //     ...columnStart,
            //     eventsIds: newStarteventsIds,
            // };
            // Get all item ids in destination list
            const newFinisheventsIds = Array.from(columnFinish.eventsIds);

            // Insert the id of dragged item to the new position in destination list
            newFinisheventsIds.splice(destination.index, 0, draggableId);

            // Create new, updated, object with data for destination column
            // const newColumnFinish = {
            //     ...columnFinish,
            //     eventsIds: newFinisheventsIds,
            // };
            // Create new board state with updated data for both, source and destination days
            // const newState = {
            //     ...state,
            //     days: {
            //         ...state.days,
            //         [newColumnStart.sessionId]: newColumnStart,
            //         [newColumnFinish.sessionId]: newColumnFinish,
            //     },
            // };
            // Update the board state with new data
            // setState(newState);
        }
    };

    return (
        <Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="all-days"
                    direction="horizontal"
                    type="column"
                    key="all-days"
                >
                    {provided => (
                        <div
                            className={classes.container}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <div className={classes.calendarGrid}>
                                {weekDays.map((item, index) => (
                                    <div key={index}>
                                        <Typography
                                            className={classes.dayName}
                                            variant="h6"
                                        >
                                            {item}
                                        </Typography>
                                    </div>
                                ))}
                                {/* Get all days in the order specified in 'board-initial-data.ts' */}
                                {slotsIds.map((dayId, index) => {
                                    // Get id of the current column
                                    const day = slots[dayId];

                                    // Get items belonging to the current column
                                    const dayEvents: TypeEvent[] = day.eventsIds.map(
                                        (eventId: string) => events[eventId]
                                    );

                                    // Render the BoardColumn component
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
