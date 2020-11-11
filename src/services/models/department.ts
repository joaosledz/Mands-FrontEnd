export type DepartmentModel = {
    department_: {
        name: string;
        objective: string;
        email: string;
    };
};

export type TypeDepartment = {
    companyDepartmentUserId: number;
    companyId: number;
    company: null;
    userId: null;
    user: null;
    departmentId: number;
    department: {
        departmentId: number;
        name: string;
        objective: string;
        email: string;
        phone: string;
        imageId: null;
        image: null;
        companyDepartmentUsers: any[];
        departmentProjectUsers: null;
        requests: null;
        departmentEvents: null;
    };
    depPermissionId: null;
    depPermission: null;
};
