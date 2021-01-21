import api from '../api';
import { TypeDepartmentPermission } from '../models/departmentPermission';
import departmentPermUrls from '../urls/departmentPermission';

const departmentPermissionApi = {
    list: (company_id: number, department_id: number) =>
        api.get<TypeDepartmentPermission[]>(
            departmentPermUrls.list + `${company_id}/${department_id}`
        ),
};

export default departmentPermissionApi;
