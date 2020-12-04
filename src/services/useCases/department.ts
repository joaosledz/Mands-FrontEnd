import api from '../api';
import {
    DepartmentModel,
    TypeDepartment,
    TypeMember,
} from '../models/department';
import departmentUrls from '../urls/department';

const departmentApi = {
    show: (company_name: string, department_name: string) =>
        api.get<TypeDepartment>(
            departmentUrls.show + `${company_name}/${department_name}`
        ),

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

    listEmployees: async (company_id: number, department_id: number) => {
        try {
            const response = await api.get<Array<TypeMember>>(
                departmentUrls.listEmployees + `${company_id}/${department_id}`
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
