export type TypeCalendarData = {
    events: TypeEvents;
    days: TypeDays;
};

export type TypeEvents = {
    [key: string]: TypeEvent;
};

export type TypeEvent = {
    scheduleId: number;
    eventId: string;
    title: string;
    description: string;
    color: string;
    startTime: string;
    endTime: string;
    department: string | null;
    project: string | null;
};

export type TypeDays = {
    [key: string]: TypeDay;
};

export type TypeDay = {
    dayId: string;
    eventsIds: Array<string>;
};

export type TypeSchedule = {
    name: string;
    id: number;
    selected?: boolean;
    color: string;
    type: string;
};

export type TypeFormEvent = {
    scheduleId: number;
    eventId: string;
    title: string;
    description: string;
    color: string;
    startTime: string;
    endTime: string;
    department?: string;
    project?: string;
    date: string;
};

export type TypeMenuValues = {
    departments: TypeSchedule[];
    projects: TypeSchedule[];
    company: TypeSchedule;
};

export type TypeFilter = number[];
