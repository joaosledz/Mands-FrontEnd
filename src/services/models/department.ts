export type DepartmentModel = {
    name: string;
    objective: string;
    email: string;
};

export type TypeDepartment = {
    departmentId: number;
    name: string;
    objective: string;
    email: string;
    phone: string;
    imageId: number;
    image: string;
    members: Array<{
        userId: number;
        name: string;
        surname: string;
        image: string;
    }>;
};
