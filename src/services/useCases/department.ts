import api from '../api';
import {
    DepartmentModel,
    TypeDepartment,
    TypeMember,
    TypeDepAssociateModel,
} from '../models/department';
import departmentUrls from '../urls/department';

const departmentApi = {
    show: (company_name: string, department_name: string) =>
        api.get<TypeDepartment>(
            departmentUrls.base + `${company_name}/${department_name}`
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

    create: (company_id: number, data: DepartmentModel) =>
        api.post<TypeDepartment>(departmentUrls.create + company_id, data),

    verifyUsername: (company_id: number, name: string) =>
        api.get<TypeDepartment>(
            departmentUrls.create + `${company_id}/${name}`
        ),

    update: (
        department_id: number,
        company_id: number,
        data: DepartmentModel
    ) =>
        api.put<TypeDepartment>(
            departmentUrls.base + `${department_id}/${company_id}`,
            data
        ),

    associate: (
        company_id: number,
        department_id: number,
        data: TypeDepAssociateModel[]
    ) =>
        api.post<void>(
            departmentUrls.associate + `${company_id}/${department_id}`,
            data
        ),

    delete: (department_id: number, company_id: number) =>
        api.delete(departmentUrls.base + `${department_id}/${company_id}`),
};

export default departmentApi;
