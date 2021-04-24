import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { testData, schedules } from './Data/state';
// import snackbarUtils from '../../../utils/functions/snackbarUtils';
import {
    TypeCalendarData,
    TypeDay,
    // TypeDays,
    TypeEvent,
    TypeSchedule,
    // TypeEvents,
    // TypeFilter,
    // TypeMenuValues,
} from './models';

interface CalendarContextData {
    state: TypeCalendarData;
    setState: Dispatch<SetStateAction<TypeCalendarData>>;
    schedules: TypeSchedule[];
    filter: Array<number>;
    setFilter: Dispatch<SetStateAction<Array<number>>>;
    loading: boolean;
    onEventChange: (
        dayStart: TypeDay,
        dayFinish: TypeDay,
        eventId: string
    ) => void;
    onEventCreate: (event: TypeEvent, dayId: string) => void;
    onEventEdit: (updatedEvent: TypeEvent) => void;
    onEventDelete: (eventId: string, dayId: string) => void;
}

const CalendarContext = createContext<CalendarContextData>(
    {} as CalendarContextData
);

export const CalendarProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<TypeCalendarData>(testData);
    const [loading /*, setLoading*/] = useState<boolean>(false);
    const [filter, setFilter] = useState<number[]>([]);

    const onEventChange = (
        dayStart: TypeDay,
        dayFinish: TypeDay,
        eventId: string
    ) => {
        setState({
            ...state,
            days: {
                ...state.days,
                [dayStart.dayId]: dayStart,
                [dayFinish.dayId]: dayFinish,
            },
        });
    };
    // const onDateChange = (dayStart: string, dayFinish: string, eventId:string) =>{
    //         let auxState = state;
    //         const newStarteventsIds = Array.from(auxState.days[dayStart].eventsIds);

    //         // Remove the id of dragged event from its original position
    //         newStarteventsIds.splice(eventId, 1);

    //         // Create new, updated, object with data for source day
    //         const newDayStart = {
    //             ...dayStart,
    //             eventsIds: newStarteventsIds,
    //         };
    //         // Get all event ids in destination list
    //         const newFinisheventsIds = Array.from(dayFinish.eventsIds);

    //         // Insert the id of dragged event to the new position in destination list
    //         newFinisheventsIds.splice(destination.index, 0, draggableId);

    //         // Create new, updated, object with data for destination day
    //         const newDayFinish = {
    //             ...dayFinish,
    //             eventsIds: newFinisheventsIds,
    //         };
    // }
    const onEventCreate = (event: TypeEvent, dayId: string) => {
        const eventId = uuidv4();
        const newEvent: TypeEvent = { ...event, eventId: eventId };

        setState({
            ...state,
            events: { ...state.events, [eventId]: newEvent },
            days: {
                ...state.days,
                [dayId]: {
                    dayId: dayId,
                    eventsIds: state.days[dayId]
                        ? [...state.days[dayId].eventsIds, eventId]
                        : [eventId],
                },
            },
        });
    };
    const onEventEdit = (updatedEvent: TypeEvent) => {
        console.log(updatedEvent.eventId);
        let auxState = state;
        auxState.events[updatedEvent.eventId] = updatedEvent;
        setState(auxState);
    };
    const onEventDelete = (eventId: string, dayId: string) => {
        setState({
            ...state,
            days: {
                ...state.days,
                [dayId]: {
                    ...state.days[dayId],
                    eventsIds: state.days[dayId].eventsIds.filter(
                        (item: string) => item !== eventId
                    ),
                },
            },
        });
    };
    return (
        <CalendarContext.Provider
            value={{
                state,
                setState,
                loading,
                onEventChange,
                onEventEdit,
                onEventCreate,
                onEventDelete,
                filter,
                setFilter,
                schedules,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

export default CalendarContext;
