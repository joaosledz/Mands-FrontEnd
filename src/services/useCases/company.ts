import api from '../api';
import { UserCompanyType, CompanyModel } from '../models/company';
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

    show: async (company_id: number) => {
        try {
            const response = await api.get<UserCompanyType>(
                `${companyUrls.base}/${company_id}`
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

    showAllCompanyData: async (company_name: string) => {
        try {
            const response = await api.get<UserCompanyType>(
                companyUrls.showAllCompanyData + `/${company_name}`
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
};

export default companyApi;
