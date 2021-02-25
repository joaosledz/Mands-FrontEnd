import api from '../api';
import {
    TypeCompanyPermission,
    TypeCompanyModel,
} from '../models/companyPermission';
import companyPermUrls from '../urls/companyPermission';

const companyPermissionApi = {
    list: (company_id: number) =>
        api.get<TypeCompanyPermission[]>(companyPermUrls.list + company_id),

    userPermissions: (company_id: number) =>
        api.get<TypeCompanyPermission>(
            companyPermUrls.userPermissions + company_id
        ),

    create: (company_id: number, data: TypeCompanyModel) =>
        api.post(companyPermUrls.create + company_id, data),

    editUserPerm: (company_id: number, user_id: number, perm_id: number) =>
        api.put(
            `${companyPermUrls.editUserPerm}${company_id}/${user_id}/${perm_id}`
        ),
};

export default companyPermissionApi;
