import api from '../api';
import { AxiosResponse, AxiosError } from 'axios';
import { LoginType, LoginModel, userType } from '../models/authentication';
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
    me: () => {
        return api
            .get('/me')
            .then((response: AxiosResponse<userType>) => {
                // console.log(response);
                return Promise.resolve(response);
            })
            .catch((error: AxiosError) => {
                console.log(error);
                return Promise.reject(error);
            });
    },
};

export default auth;
