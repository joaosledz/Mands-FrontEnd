import { TypeBoard, TypeNewBoard } from '../../models/boardTypes';

export const initialBoardData: TypeBoard = {
    items: {
        '1': {
            id: '1',
            title: 'Relatório Financeiro',
            description: 'Atividades referentes ao financeiro',
            responsible: ['Raiane Souza', 'Josefa Oliveira'],
        },
        '2': {
            id: '2',
            title: 'Relatório Marketing',
            description: 'Atividades referentes ao financeiro',
            responsible: ['Raiane Souza', 'Josefa Oliveira'],
        },
    },
    columns: {
        '1': {
            id: '1',
            title: 'A Fazer',
            itemsIds: ['1'],
        },
        '2': {
            id: '2',
            title: 'A Fazer',
            itemsIds: ['2'],
        },
    },
    columnsOrder: ['1', '2'],
};

export const newBoardData: TypeNewBoard = [
    {
        sessionId: 51,
        position: 1,
        title: 'Afazeres',
        description: '',
        tasks: [
            {
                taskId: 21,
                title: 'Pagar estagiários',
                description: 'Muito muito dinheiro',
                tag: {
                    tagId: 11,
                    companyId: 71,
                    label: 'Financeiro',
                    color: 'green',
                },
                subtasks: [
                    {
                        completed: false,
                        description: 'string',
                    },
                ],
                responsible: null,
            },
        ],
    },
    {
        sessionId: 41,
        position: 2,
        title: 'Em Progresso',
        description: '',
        tasks: null,
    },
    {
        sessionId: 31,
        position: 3,
        title: 'Finalizado',
        description: '',
        tasks: null,
    },
];

export const initialBoardData3: TypeBoard = {
    items: {
        'item-1': {
            taskId: 'item-1',
            title: 'Relatório Financeiro',
            description: 'Atividades referentes ao financeiro',
            tag: {
                tagId: 11,
                companyId: 71,
                label: 'Marketing',
                color: 'orange',
            },
            subtasks: null,
            responsible: ['Raiane Souza', 'Josefa Oliveira'],
        },
        'item-2': {
            taskId: 'item-2',
            title: 'Relatório de Marketing',
            description: 'Atividades referentes ao admin',
            tag: null,
            responsible: ['Raiane Souza', 'Xandão'],
            subtasks: [
                {
                    completed: false,
                    description: 'string',
                },
            ],
        },
        'item-3': {
            taskId: 'item-3',
            title: 'Andamento Alvenaria',
            description: 'Atividades referentes ao marketing',
            tag: {
                tagId: 21,
                companyId: 71,
                label: 'Financeiro',
                color: 'green',
            },
            responsible: ['Raiane Souza', 'José Lima'],
            subtasks: [
                {
                    completed: false,
                    description: 'string2',
                },
                {
                    completed: true,
                    description: 'string3',
                },
            ],
        },
    },
    columns: {
        'column-1': {
            sessionId: 'column-1',
            title: 'A Fazer',
            itemsIds: ['item-1', 'item-2', 'item-3'],
        },
        'column-2': {
            sessionId: 'column-2',
            title: 'Em Andamento',
            itemsIds: [],
        },
        'column-3': {
            sessionId: 'column-3',
            title: 'Concluido',
            itemsIds: [],
        },
    },
    columnsOrder: ['column-1', 'column-2', 'column-3'],
};
