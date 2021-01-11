import api from '../api';
import { AxiosResponse } from 'axios';
import { TypeUser } from '../models/authentication';
import userUrls from '../urls/user';
const userApi = {
    show: async (username: string) => {
        try {
            const response: AxiosResponse<TypeUser> = await api.get(
                userUrls.show + username
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};

export default userApi;
