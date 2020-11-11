import api from '../api';
import { DepartmentModel, TypeDepartment } from '../models/department';
import departmentUrls from '../urls/department';

const departmentApi = {
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
