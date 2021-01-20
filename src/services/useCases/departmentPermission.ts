import api from '../api';
import { TypeDepartmentPermission } from '../models/departmentPermission';
import companyPermissionsUrls from '../urls/departmentPermission';

const departmentPermissionApi = {
    list: (company_id: number, department_id: number) =>
        api.get<TypeDepartmentPermission>(
            companyPermissionsUrls.list + `${company_id}/${department_id}`
        ),
};

export default departmentPermissionApi;
