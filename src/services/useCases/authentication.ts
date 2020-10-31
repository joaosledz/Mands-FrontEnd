import api from '../api';
import { AxiosResponse } from 'axios';
import {
    LoginType,
    LoginModel,
    userType,
    RegisterModel,
} from '../models/authentication';
import authUrls from '../urls/authentication';

const authApi = {
    login: async (data: LoginType) => {
        try {
            const response: AxiosResponse<LoginModel> = await api.post(
                authUrls.login,
                data
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    me: async () => {
        try {
            const response: AxiosResponse<userType> = await api.get(
                authUrls.me
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    register: async (data: RegisterModel) => {
        try {
            const response: AxiosResponse<any> = await api.post(
                authUrls.register,
                data
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};

export default authApi;
