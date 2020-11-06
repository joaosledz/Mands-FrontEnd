export type CompanyModel = {
    company: {
        name: string;
        username: string;
        phone: string;
        email: string;
        cnpj?: string;
    };
};

type TypeCompanyPermission = {
    compPermissionId: number;
    name: string;
    acceptUser: boolean;
    deleteUser: boolean;
    department: boolean;
    project: boolean;
    editCompany: boolean;
    resetPIN: boolean;
    seePIN: boolean;
    event: boolean;
    permission: boolean;
    companyUsers: any[];
};

export type UserCompanyType = {
    companyId: number;
    name: string;
    username: string;
    email: string;
    cnpj: string;
    pin: string;
    phone: string;
    imageId: number;
    image: string;
    userPermission: TypeCompanyPermission;
};
