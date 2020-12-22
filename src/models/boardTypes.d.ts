//ITEMS
export type TypeMembers = Array<string>;

export type TypeSubTask = {
    id: string;
    completed: boolean;
    description: string;
};

export type TypeItem = Object<
    string,
    {
        taskId: string;
        title: string;
        description: string;
        tag: {
            tagId: number;
            companyId: number;
            label: string;
            color: string;
        } | null;
        responsible: Array<string>;
        subtasks: [
            {
                completed: boolean;
                description: string;
            }
        ];
        // tasks: Array<{
        //     id: string;
        //     checked: boolean;
        //     title: string;
        // }>;
    }
>;

//COLUMNS

export type TypeColumn = Object<
    string,
    {
        id: string;
        title: string;
        itemsIds: Array<string>;
    }
>;

export type TypeBoard = {
    items: Object<
        string,
        {
            taskId: string;
            title: string;
            description: string;
            tag: {
                tagId: number;
                companyId: number;
                label: string;
                color: string;
            } | null;
            responsible: Array<string>;
            subtasks: [
                {
                    completed: boolean;
                    description: string;
                }
            ];
            // tasks: Array<{
            //     id: string;
            //     checked: boolean;
            //     title: string;
            // }>;
        }
    >;
    columns: Object<
        string,
        {
            id: string;
            title: string;
            itemsIds: Array<string>;
        }
    >;
    columnsOrder: Array<string>;
};
export type TypeNewBoard = Array<{
    sessionId: number;
    position: number;
    title: string;
    description: string;
    tasks: Array<{
        taskId: number;
        title: string;
        description: string;
        tag: {
            tagId: number;
            companyId: number;
            label: string;
            color: string;
        } | null;
        subtasks: [
            {
                completed: boolean;
                description: string;
            }
        ];
        responsible: Array<string> | null;
    }> | null;
}>;
