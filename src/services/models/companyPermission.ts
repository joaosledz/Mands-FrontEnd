export type TypeCompanyPermission = {
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
};

export type TypeCompanyModel = {
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
};
