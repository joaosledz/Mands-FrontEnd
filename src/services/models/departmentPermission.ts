export type TypeDepartmentPermission = {
    depPermissionId: number;
    name: string;
    editDepartment: boolean;
    deleteDepartment: boolean;
    project: boolean;
    inviteUser: boolean;
    deleteUser: boolean;
    permission: boolean;
};

export type TypeDepartmentModel = {
    name: string;
    editDepartment: boolean;
    deleteDepartment: boolean;
    project: boolean;
    inviteUser: boolean;
    deleteUser: boolean;
    permission: boolean;
};
