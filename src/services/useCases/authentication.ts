import api from '../api';
import { AxiosResponse } from 'axios';
import { LoginType, LoginModel } from '../models/authentication';
import { loginURL } from '../urls/authentication';

const auth = {
    login: async (data: LoginType) => {
        try {
            const response: AxiosResponse<LoginModel> = await api.post(
                loginURL,
                data
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};

export default auth;
