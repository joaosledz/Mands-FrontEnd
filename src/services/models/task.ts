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
