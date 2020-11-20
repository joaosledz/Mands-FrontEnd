import api from '../api';
import { TypeCompanyPermission } from '../models/companyPermission';
import companyPermissionsUrls from '../urls/companyPermission';

const companyPermissionApi = {
    userPermissions: async (company_id: number) => {
        try {
            const response = await api.get<TypeCompanyPermission>(
                companyPermissionsUrls.userPermissions + company_id
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};

export default companyPermissionApi;
