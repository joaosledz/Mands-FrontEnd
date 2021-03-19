import { TypeProject } from './project';

export type DepartmentModel = {
    name: string;
    objective: string;
    email: string;
    phone?: string;
};

export type TypeMember = {
    userId: number;
    name: string;
    surname: string;
    imageId?: number;
    image: {
        imageId: number;
        path: string;
        extension: string;
        name: string;
        size: string;
    } | null;
    username: string;
    email?: string;
    cpf: string;
    admission?: null;
    permission: string;
    permissionId: number;
};

export type TypeEmployee = {
    userId: number;
    name: string;
    surname: string;
    cpf: string;
    // imageId: number;
    // image?: string;
    // username: string;
    // email: string;
    // admission: null;
    // permission: string;
    // permissionId: number;
};

export type TypeDepartment = {
    departmentId: number;
    name: string;
    objective: string;
    email: string;
    phone: string;
    imageId: number;
    image: string;
    members: Array<TypeMember>;
    projects?: Array<TypeProject>;
};

export type TypeDepAssociateModel = {
    permissionId: number;
    userId: number;
};
