export type DepartmentModel = {
    name: string;
    objective: string;
    email: string;
};

export type TypeMember = {
    userId: number;
    name: string;
    surname: string;
    imageId: number;
    image: string;
    username: string;
    email: string;
    cpf: string;
    admission: null;
    role_name: string;
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
};
