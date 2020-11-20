export const initialBoardData = {
    items: {
        'item-1': {
            id: 'item-1',
            title: 'Relatório Financeiro',
            description: 'Atividades referentes ao financeiro',
            tag: 'Financeiro',
            tagColor: 'green',
            members: ['Raiane Souza', 'Josefa Oliveira'],
            tasks: [
                {
                    id: 'task-1',
                    checked: 'true',
                    title: 'Reforma do escritório de baixo A51',
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
                { id: 'task-5', checked: 'true', title: 'Comprar suprimentos' },
                { id: 'task-6', checked: 'true', title: 'Comprar suprimentos' },
                { id: 'task-7', checked: 'true', title: 'Comprar suprimentos' },
                { id: 'task-8', checked: 'true', title: 'Comprar suprimentos' },
                { id: 'task-9', checked: 'true', title: 'Comprar suprimentos' },
                { id: 'task-10', checked: 'true', title: 'Comprar suprimentos' },
            ],
        },
        'item-2': {
            id: 'item-2',
            title: 'Relatório de Marketing',
            description: 'Atividades referentes ao admin',
            tag: 'Marketing',
            tagColor: 'blue',
            members: ['Raiane Souza', 'Xandão'],
            tasks: [],
        },
        'item-3': {
            id: 'item-3',
            title: 'Andamento Alvenaria',
            description: 'Atividades referentes ao marketing',
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
