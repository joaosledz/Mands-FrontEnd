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

export type CompanyType = {
    companyId: number;
    name: string;
    username: string;
    email: string;
    cnpj: string;
    pin: string;
    phone: string;
    imageId: number;
    image: string;
    companyUsers: Array<{
        companyUserId: number;
        companyId: number;
        userId: number;
        user: null;
        compPermissionId: number;
        compPermission: TypeCompanyPermission;
        companyEventUsers: null;
    }>;
    solicitations: null;
    companyDepartmentUsers: null;
    companyEvents: null;
};
