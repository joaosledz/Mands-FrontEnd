type userType = {
    userId: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    email: string;
    cpf: string;
    admission: null;
    phone: string;
    birthday: string;
    addressId: null;
    address: null;
    biography: string;
    imageId: number;
    image: string;
    linkedin: string;
    gitHub: string;
    companyUsers: null;
    solicitations: null;
    companyDepartmentUser: null;
    departmentProjectUsers: null;
    taskUsers: null;
};

type LoginType = {
    email: string;
    password: string;
};

type LoginModel = {
    user: userType;
    token: string;
};

type RegisterModel = {
    name: string;
    surname: string;
    username: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
};

type updateModel = {
    name: string;
    surname: string;
    phone: string;
    email: string;
    biography: string;
    gitHub: string;
    linkedin: string;
};

export type { userType, updateModel, LoginType, LoginModel, RegisterModel };
