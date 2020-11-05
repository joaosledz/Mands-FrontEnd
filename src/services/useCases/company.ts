import api from '../api';
import { CompanyType, CompanyModel } from '../models/company';
import companyUrls from '../urls/company';

const companyApi = {
    list: async () => {
        try {
            const response = await api.get<any>(companyUrls.list);
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },

    userCompanies: async () => {
        try {
            const response = await api.get<Array<CompanyType>>(
                companyUrls.userCompanies
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
