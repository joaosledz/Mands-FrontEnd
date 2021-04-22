import { TypeCalendarData, TypeMenuValues } from '../models';

export const state: TypeCalendarData = {
    events: {
        'item-1': {
            eventId: 'item-1',
            title: 'Relatório Financeiro',
            description: 'Atividades referentes ao financeiro',
            startTime: '17:00',
            endTime: '18:00',
            color: 'green',
            department: 'Desenvolvedores',
            project: 'Mands',
        },
        'item-2': {
            eventId: 'item-2',
            title: 'Relatório de Marketing',
            description: 'Atividades referentes ao admin',
            startTime: '16:00',
            endTime: '17:00',
            color: 'blue',
            department: 'Desenvolvedores',
            project: 'Mands',
        },
        'item-3': {
            eventId: 'item-3',
            title: 'Andamento Alvenaria',
            description: 'Atividades referentes ao marketing',
            startTime: '12:00',
            endTime: '16:00',
            color: 'orange',
            department: 'Financeiro',
            project: 'Seu Zé',
        },
        'item-4': {
            eventId: 'item-4',
            title: 'Andamento Alvenaria',
            description: 'Atividades referentes ao marketing',
            startTime: '15:00',
            endTime: '19:00',
            color: 'orange',
            department: 'Financeiro',
            project: 'Seu Zé',
        },
    },
    days: {
        '1/4/2021': {
            dayId: '1/4/2021',
            title: '1',
            eventsIds: ['item-1', 'item-2', 'item-3', 'item-4'],
        },
        '2/4/2021': {
            dayId: '2/4/2021',
            title: '2',
            eventsIds: [],
        },
        '3/4/2021': {
            dayId: '3/4/2021',
            title: '3',
            eventsIds: [],
        },
        '4/4/2021': {
            dayId: '4/4/2021',
            title: '4',
            eventsIds: [],
        },
        '5/4/2021': {
            dayId: '5/4/2021',
            title: '5',
            eventsIds: [],
        },
        '6/4/2021': {
            dayId: '6/4/2021',
            title: '6',
            eventsIds: [],
        },
        '7/4/2021': {
            dayId: '7/4/2021',
            title: '7',
            eventsIds: [],
        },
        '8/4/2021': {
            dayId: '8/4/2021',
            title: '8',
            eventsIds: [],
        },
        '9/4/2021': {
            dayId: '9/4/2021',
            title: '9',
            eventsIds: [],
        },
        '10/4/2021': {
            dayId: '10/4/2021',
            title: '1',
            eventsIds: [],
        },
        '11/4/2021': {
            dayId: '11/4/2021',
            title: '11',
            eventsIds: [],
        },
        '12/4/2021': {
            dayId: '12/4/2021',
            title: '12',
            eventsIds: [],
        },
        '13/4/2021': {
            dayId: '13/4/2021',
            title: '13',
            eventsIds: [],
        },
        '14/4/2021': {
            dayId: '14/4/2021',
            title: '14',
            eventsIds: [],
        },
        '15/4/2021': {
            dayId: '15/4/2021',
            title: '15',
            eventsIds: [],
        },
        '16/4/2021': {
            dayId: '16/4/2021',
            title: '16',
            eventsIds: [],
        },
        '17/4/2021': {
            dayId: '17/4/2021',
            title: '17',
            eventsIds: [],
        },
        '18/4/2021': {
            dayId: '18/4/2021',
            title: '18',
            eventsIds: [],
        },
        '19/4/2021': {
            dayId: '19/4/2021',
            title: '19',
            eventsIds: [],
        },
        '20/4/2021': {
            dayId: '20/4/2021',
            title: '2',
            eventsIds: [],
        },
    },
    allDaysIds: [
        '1/4/2021',
        '2/4/2021',
        '3/4/2021',
        '4/4/2021',
        '5/4/2021',
        '6/4/2021',
        '7/4/2021',
        '8/4/2021',
        '9/4/2021',
        '1/4/2021',
        '11/4/2021',
        '12/4/2021',
        '13/4/2021',
        '14/4/2021',
        '15/4/2021',
        '16/4/2021',
        '17/4/2021',
        '18/4/2021',
        '19/4/2021',
        '2/4/2021',
    ],
};

export const menuItems: TypeMenuValues = {
    departments: [
        {
            name: 'Desenvolvedores',
            id: 0,
            color: 'cian',
        },
        {
            name: 'Designers',
            id: 1,
            color: 'green',
        },
        {
            name: 'Recursos Humanos',
            id: 2,
            color: 'orange',
        },
    ],

    projects: [
        {
            name: 'projeto 1',
            id: 0,
            color: 'blue',
        },
        {
            name: 'projeto 2',
            id: 1,
            color: 'gray',
        },
        {
            name: 'projeto 3',
            id: 2,
            color: 'purple',
        },
    ],

    company: {
        id: 0,
        name: 'Empresa X',
        color: 'red',
    },
};
