import React, { useEffect, Fragment, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TypeCalendarData, TypeDays } from '../../models';
import useStyles from './styles';
import Day from '../Day';
// import snackbarUtils from '../../../../../utils/functions/snackbarUtils';
import moment from 'moment';
import { Typography } from '@material-ui/core';
type CalendarProps = {
    state: TypeCalendarData;
};
const Board: React.FC<CalendarProps> = props => {
    // const { state } = props;
    const classes = useStyles();
    const weekdayshort = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
    ];

    const [date, setDate] = useState(moment());
    const [slots, setSlots] = useState<TypeDays>({});
    const [slotsKeys, setSlotsKeys] = useState<Array<string>>([]);
    const firstDayOfMonth = (): number => {
        return parseInt(moment(date).startOf('month').format('d'));
    };

    useEffect(() => {
        const Keys: Array<string> = [];
        let blanks: TypeDays = {};
        for (let i = 0; i < firstDayOfMonth(); i++) {
            Keys.push(`${i}`);
            blanks = {
                ...blanks,
                [`${i}`]: {
                    dayId: '',
                    title: '',
                    eventsIds: [],
                },
            };
        }
        let daysInMonth: TypeDays = {};
        for (let d = 1; d <= date.daysInMonth(); d++) {
            Keys.push(`${d}/${date.month}/${date.year}`);
            daysInMonth = {
                ...daysInMonth,
                [`${d}/${date.month}/${date.year}`]: {
                    dayId: `${d}/${date.month}/${date.year}`,
                    title: d.toString(),
                    eventsIds: [],
                },
            };
        }
        let endBlanks: TypeDays = {};
        for (let i = Keys.length; i <= 35; i++) {
            Keys.push(`${i}`);
            endBlanks = {
                ...endBlanks,
                [`${i}`]: {
                    dayId: '',
                    title: '',
                    eventsIds: [],
                },
            };
        }
        setSlotsKeys(Keys);
        setSlots({ ...blanks, ...daysInMonth, ...endBlanks });
    }, [date]);
    // Initialize board state with board data

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
                            {weekdayshort.map((item, index) => (
                                <div>
                                    <Typography
                                        className={classes.dayName}
                                        variant="h6"
                                    >
                                        {item}
                                    </Typography>
                                </div>
                            ))}
                            {/* Get all days in the order specified in 'board-initial-data.ts' */}
                            {slotsKeys.map((dayId, index) => {
                                // Get id of the current column
                                const day = slots[dayId];

                                // Get items belonging to the current column
                                // const events = day.eventsIds.map(
                                //     (eventId: string) =>
                                //         state.events[eventId]
                                // );

                                // Render the BoardColumn component
                                return (
                                    <React.Fragment>
                                        <Day
                                            key={day.dayId}
                                            day={day}
                                            events={[]}
                                            index={index}
                                        />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Fragment>
    );
};
export default Board;
