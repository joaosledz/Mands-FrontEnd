import api from '../api';
import {
    TypeDepartmentPermission,
    TypeDepartmentModel,
} from '../models/departmentPermission';
import departmentPermUrls from '../urls/departmentPermission';

const departmentPermissionApi = {
    create: (
        company_id: number,
        department_id: number,
        data: TypeDepartmentModel
    ) =>
        api.post<TypeDepartmentPermission>(
            departmentPermUrls.create + `${company_id}/${department_id}`,
            data
        ),

    list: (company_id: number, department_id: number) =>
        api.get<TypeDepartmentPermission[]>(
            departmentPermUrls.list + `${company_id}/${department_id}`
        ),

    changeUserPermission: (
        company_id: number,
        department_id: number,
        user_id: number,
        permission_id: number
    ) =>
        api.put<void>(
            departmentPermUrls.changeUserPermission +
                `${company_id}/${department_id}/${user_id}/${permission_id}`
        ),

    getUserPermissions: (department_id: number) =>
        api.get(departmentPermUrls.getUserPermissions + department_id),
};

export default departmentPermissionApi;
