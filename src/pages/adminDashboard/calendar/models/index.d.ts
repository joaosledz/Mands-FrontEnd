export type TypeCalendarData = {
    events: TypeEvents;
    days: {
        [key: string]: {
            dayId: string;
            title: string;
            eventsIds: Array<string>;
        };
    };
    allDaysIds: Array<string>;
};

export type TypeEvents = {
    [key: string]: TypeEvent;
};

export type TypeEvent = {
    eventId: string;
    title: string;
    description: string;
    color: string;
};
