import api from '../api';
import { DepartmentModel, TypeDepartment } from '../models/department';
import departmentUrls from '../urls/department';

const departmentApi = {
    listByCompany: async (company_id: number) => {
        try {
            const response = await api.get<Array<TypeDepartment>>(
                departmentUrls.listByCompany + company_id
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    create: async (data: DepartmentModel) => {
        try {
            const response = await api.post<TypeDepartment>(
                departmentUrls.create,
                data
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};

export default departmentApi;
