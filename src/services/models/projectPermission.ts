export type TypeProjectPermission = {
    projPermissionId: number;
    name: string;
    editProject: boolean;
    deleteProject: boolean;
    session: boolean;
    task: boolean;
    taskResponsible: boolean;
    createTemplate: boolean;
};

export type TypeProjectPermModel = {
    name: string;
    editProject: boolean;
    deleteProject: boolean;
    session: boolean;
    task: boolean;
    taskResponsible: boolean;
    createTemplate: boolean;
};
