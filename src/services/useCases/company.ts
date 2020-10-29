import api from '../api';
import { AxiosResponse } from 'axios';
// import {} from '../models/company';
import companyUrls from '../urls/company';

const companyApi = {
    list: async () => {
        try {
            const response: AxiosResponse<any> = await api.get(
                companyUrls.list
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },

    create: async () => {
        try {
            const response = await api.post(companyUrls.create);
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};

export default companyApi;
