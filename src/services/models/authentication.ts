type TypeUser = {
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
    image: {
        name: string;
        path: string;
        extention: string;
        size: string;
    };
    linkedin: string;
    gitHub: string;
};

type LoginType = {
    credential: string;
    password: string;
};

type LoginModel = {
    user: TypeUser;
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

export type { TypeUser, updateModel, LoginType, LoginModel, RegisterModel };
