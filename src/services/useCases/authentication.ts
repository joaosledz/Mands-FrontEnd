import api from '../api';
import { AxiosResponse } from 'axios';
import {
    LoginType,
    LoginModel,
    TypeUser,
    RegisterModel,
    updateModel,
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

    me: async (token?: string) => {
        try {
            const response: AxiosResponse<TypeUser> = await api.get(
                authUrls.me,
                token
                    ? { headers: { Authorization: `Bearer ${token}` } }
                    : undefined
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    verifyUsername: (username: string) =>
        api.get(authUrls.verifyUsername + `/${username}`),

    register: async (data: RegisterModel) => {
        try {
            const response: AxiosResponse<userType> = await api.post(
                authUrls.register,
                data
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },

    recoverPassword: async (email: string) => {
        try {
            const response: AxiosResponse<any> = await api.post(
                authUrls.changePassword,
                {
                    email,
                }
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },

    changePassword: async (password: string, token: string) => {
        try {
            const response: AxiosResponse<any> = await api.put(
                authUrls.changePassword,
                {
                    password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    update: async (data: updateModel) => {
        try {
            const response: AxiosResponse<TypeUser> = await api.put(
                authUrls.update,
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
