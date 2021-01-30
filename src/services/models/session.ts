export type sessionType = {
    title: string;
    description: string;
    companyId: number;
    departmentId: number;
};

export type updateSessionPositionType = Array<{
    sessionId: number;
    position: number;
}>;

export type deleteSessionType = {
    companyId: number;
    departmentId: number;
    projectId: number;
};
