export const initialBoardData = {
    items: {
        'item-1': {
            id: 'item-1',
            title: 'Relatório Financeiro',
            tag: 'Financeiro',
            tagColor: 'green',
            members: ['Raiane Souza', 'Josefa Oliveira'],
            tasks: [
                {
                    id: 'task-1',
                    checked: 'true',
                    title: 'Reforma do escritório',
                },
                {
                    id: 'task-2',
                    checked: 'false',
                    title: 'Confecção dos crachás',
                },
                {
                    id: 'task-3',
                    checked: 'true',
                    title: 'Marcar reunião semanal',
                },
                { id: 'task-4', checked: 'true', title: 'Comprar suprimentos' },
            ],
        },
        'item-2': {
            id: 'item-2',
            title: 'Relatório de Marketing',
            tag: 'Marketing',
            tagColor: 'blue',
            members: ['Raiane Souza', 'Xandão'],
            tasks: [],
        },
        'item-3': {
            id: 'item-3',
            title: 'Andamento Alvenaria',
            tag: 'Reforma',
            tagColor: 'orange',
            members: ['Raiane Souza', 'José Lima'],
            tasks: [],
        },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'A Fazer',
            itemsIds: ['item-1', 'item-2', 'item-3'],
        },
        'column-2': {
            id: 'column-2',
            title: 'Em Andamento',
            itemsIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Concluido',
            itemsIds: [],
        },
    },
    columnsOrder: ['column-1', 'column-2', 'column-3'],
};
