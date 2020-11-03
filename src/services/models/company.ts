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
        compPermission: null;
        companyEventUsers: null;
    }>;
    solicitations: null;
    companyDepartmentUsers: null;
    companyEvents: null;
};
