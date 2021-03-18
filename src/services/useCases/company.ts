import api from '../api';
import {
    TypeCompany,
    CompanyModel,
    CompanyUpdateModel,
} from '../models/company';
import { TypeMember, TypeDepAssociateModel } from '../models/department';
import companyUrls from '../urls/company';

const companyApi = {
    list: () => api.get<any>(companyUrls.base),

    show: (company_username: string) =>
        api.get<TypeCompany>(`${companyUrls.base}/${company_username}`),

    userCompanies: () => api.get<Array<TypeCompany>>(companyUrls.userCompanies),

    findAllEmployees: (company_id: number) =>
        api.get<Array<TypeMember>>(companyUrls.findAllEmployees + company_id),

    showAllCompanyData: (company_name: string) =>
        api.get<TypeCompany>(companyUrls.showAllCompanyData + company_name),

    create: (data: CompanyModel) =>
        api.post<TypeCompany>(companyUrls.base, data),

    update: (companyId: number, data: CompanyUpdateModel) =>
        api.put(`${companyUrls.base}/${companyId}`, data),

    associate: (company_id: number, data: TypeDepAssociateModel[]) =>
        api.post<void>(companyUrls.associate + company_id, data),

    acceptInvite: (token: string) =>
        api.post<void>(
            companyUrls.acceptInvite,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ),

    delete: (company_id: number) =>
        api.delete(companyUrls.base + `/${company_id}`),

    verifyUsername: (username: string) =>
        api.get(companyUrls.verifyUsername + `${username}`),

    removeEmployee: (company_id: number, employee_id: number) =>
        api.delete(`${companyUrls.base}/${company_id}/${employee_id}`),

    quitCompany: (company_id: number) =>
        api.delete(`${companyUrls.quitCompany}${company_id}`),
};

export default companyApi;
