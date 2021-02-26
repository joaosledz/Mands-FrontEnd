export type SubmitTaskType = {
    //sessionId: number;
    departmentId: number;
    projectId: number;
    title?: string;
    description?: string;
    completed?: boolean;
    progress?: boolean;
    initialDate?: Date;
    finalDate?: Date;
    cost?: number;
    dependency?: Array<{
        type: number;
        headId: number;
    }>;
    subtasks?: Array<{
        description: string;
    }>;
    tagId?: number;
};

export type SubmitResponsible = {
    userIds: Array<number>;
    departmentId: number;
    projectId: number;
};
export type SubmitDeleteTask = {
    companyId: number;
    departmentId: number;
    projectId: number;
};

export type SubmitChangeSession = {
    companyId: number;
    departmentId: number;
    projectId: number;
};

export type SubtaskType = {
    completed: boolean;
    description: string;
    departmentId: number;
    projectId: number;
    companyId: number;
};

export type updateTaskPositionType = Array<{
    taskId: number;
    position: number;
}>;
