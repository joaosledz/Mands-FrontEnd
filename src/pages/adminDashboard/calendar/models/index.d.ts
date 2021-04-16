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

export type TypeMenuItem = {
    name: string;
    id: number;
    selected?: boolean;
    color: string;
};

export type TypeMenuValues = {
    departments: Array<TypeMenuItem>;
    projects: Array<TypeMenuItem>;
    company: TypeMenuItem;
};

export type TypeFilter = {
    filteredDeps: number[];
    filteredProjs: number[];
    filteredCompany: number[];
};
