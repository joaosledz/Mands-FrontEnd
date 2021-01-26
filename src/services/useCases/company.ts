import api from '../api';
import {
    UserCompanyType,
    CompanyModel,
    CompanyUpdateModel,
} from '../models/company';
import { TypeMember, TypeDepAssociateModel } from '../models/department';
import companyUrls from '../urls/company';

const companyApi = {
    list: () => api.get<any>(companyUrls.base),

    show: (company_username: string) =>
        api.get<UserCompanyType>(`${companyUrls.base}/${company_username}`),

    userCompanies: () =>
        api.get<Array<UserCompanyType>>(companyUrls.userCompanies),

    findAllEmployees: (company_id: number) =>
        api.get<Array<TypeMember>>(companyUrls.findAllEmployees + company_id),

    showAllCompanyData: (company_name: string) =>
        api.get<UserCompanyType>(companyUrls.showAllCompanyData + company_name),

    create: (data: CompanyModel) =>
        api.post<UserCompanyType>(companyUrls.base, data),

    update: (companyId: number, data: CompanyUpdateModel) =>
        api.put(`${companyUrls.base}/${companyId}`, data),

    associate: (company_id: number, data: TypeDepAssociateModel[]) =>
        api.post<void>(companyUrls.associate + company_id, data),

    delete: (company_id: number) =>
        api.delete(companyUrls.base + `/${company_id}`),

    verifyUsername: (username: string) =>
        api.get(companyUrls.verifyUsername + `${username}`),
};

export default companyApi;
