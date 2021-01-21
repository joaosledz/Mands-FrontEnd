import api from '../api';
import { TypeCompanyPermission } from '../models/companyPermission';
import companyPermUrls from '../urls/companyPermission';

const companyPermissionApi = {
    list: (company_id: number) =>
        api.get<TypeCompanyPermission[]>(companyPermUrls.list + company_id),

    userPermissions: (company_id: number) =>
        api.get<TypeCompanyPermission>(
            companyPermUrls.userPermissions + company_id
        ),
};

export default companyPermissionApi;
