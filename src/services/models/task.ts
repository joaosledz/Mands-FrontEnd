export type SubmitTaskType = {
    sessionId?: number;
    departmentId: number;
    projectId: number;
    title: string;
    description?: string;
    initialDate?: Date;
    finalDate?: Date;
    cost?: number;
};

export type SubmitResponsible = {
    userIds: Array<number>;
    departmentId: number;
    projectId: number;
};
