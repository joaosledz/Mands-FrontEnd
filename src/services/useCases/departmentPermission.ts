import api from '../api';
import { TypeDepartmentPermission } from '../models/departmentPermission';
import departmentPermUrls from '../urls/departmentPermission';

const departmentPermissionApi = {
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
};

export default departmentPermissionApi;
