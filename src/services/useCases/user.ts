import api from '../api';
import { AxiosResponse } from 'axios';
import { updateModel, userType } from '../models/authentication';
import userUrls from '../urls/user';
const userApi = {
    show: async (username: string) => {
        try {
            const response: AxiosResponse<userType> = await api.get(
                `${userUrls.show}/${username}`
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    update: async (data: updateModel, userId: number) => {
        try {
            const response: AxiosResponse<userType> = await api.put(
                `${userUrls.show}/${userId}`,
                data
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};

export default userApi;
