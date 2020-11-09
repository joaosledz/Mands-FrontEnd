//ITEMS
export type TypeMembers = Array<string>;

export type TypeTask = {
    id: string;
    checked: boolean;
    title: string;
};

export type TypeItem = Object<
    string,
    {
        id: string;
        title: string;
        description: string;
        tag: string;
        tagColor: string;
        members: Array<string>;
        tasks: Array<{
            id: string;
            checked: boolean;
            title: string;
        }>;
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
            id: string;
            title: string;
            description: string;
            tag: string;
            tagColor: string;
            members: Array<string>;
            tasks: Array<{
                id: string;
                checked: boolean;
                title: string;
            }>;
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
