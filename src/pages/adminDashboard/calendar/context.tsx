import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import { testData } from './Data/state';
// import snackbarUtils from '../../../utils/functions/snackbarUtils';
import {
    TypeCalendarData,
    TypeDay,
    // TypeDays,
    // TypeEvent,
    // TypeEvents,
    // TypeFilter,
    // TypeMenuValues,
    // TypeSchedule,
} from './models';

interface CalendarContextData {
    state: TypeCalendarData;
    setState: Dispatch<SetStateAction<TypeCalendarData>>;
    filter: Array<number>;
    setFilter: Dispatch<SetStateAction<Array<number>>>;
    loading: boolean;
    onEventChange: (
        dayStart: TypeDay,
        dayFinish: TypeDay,
        eventId: string
    ) => void;
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
                onEventDelete,
                filter,
                setFilter,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};

export default CalendarContext;
