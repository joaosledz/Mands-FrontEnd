export type ProjectModel = {
    project: {
        name: string;
        description: string;
        initialDate: string;
        finalDate: string;
        budget: number;
    };
    associations: Array<number>;
};

export type TypeProject = {
    projectId: number;
    name: string;
    description: string;
    initialDate: string;
    finalDate: string;
    budget: number;
    imageId: number;
    image: string;
    projectSessions: null;
    eventProjects: null;
    requests: null;
    departmentProjectUsers: [
        {
            departmentProjectUserId: number;
            departmentId: number;
            department: null;
            projectId: number;
            projPermissionId: null;
            projPermission: null;
            userId: number;
            user: null;
        }
    ];
};
