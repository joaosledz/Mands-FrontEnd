import api from '../api';
import {
    UserCompanyType,
    CompanyModel,
    CompanyUpdateModel,
} from '../models/company';
import { TypeMember } from '../models/department';
import companyUrls from '../urls/company';

const companyApi = {
    list: async () => {
        try {
            const response = await api.get<any>(companyUrls.base);
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },

    show: async (company_username: string) => {
        try {
            const response = await api.get<UserCompanyType>(
                `${companyUrls.base}/${company_username}`
            );
            sessionStorage.setItem(
                '@Mands:CompanyData',
                JSON.stringify(response.data)
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },

    userCompanies: async () => {
        try {
            const response = await api.get<Array<UserCompanyType>>(
                companyUrls.userCompanies
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },

    findAllEmployees: (company_id: number) =>
        api.get<Array<TypeMember>>(companyUrls.findAllEmployees + company_id),

    showAllCompanyData: async (company_name: string) => {
        try {
            const response = await api.get<UserCompanyType>(
                companyUrls.showAllCompanyData + company_name
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },

    create: async (data: CompanyModel) => {
        try {
            const response = await api.post(companyUrls.create, data);
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    update: async (companyId: number, data: CompanyUpdateModel) => {
        try {
            const response = await api.put(
                `${companyUrls.base}/${companyId}`,
                data
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    verifyUsername: (username: string) =>
        api.get(companyUrls.verifyUsername + `${username}`),
};

export default companyApi;
