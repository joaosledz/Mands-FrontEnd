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
};

export type TypeUserPerm = {
    userId: number;
    permissionId: number;
};
