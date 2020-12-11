import api from '../api';
import { AxiosResponse } from 'axios';
import { ImageType, /*ImageErrorType,*/ PostImageType } from '../models/image';
import imageUrls from '../urls/image';
const userApi = {
    get: async () => {
        try {
            const response: AxiosResponse = await api.get(`${imageUrls.main}`);
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },

    getById: async (ImageId: number) => {
        try {
            const response: AxiosResponse<ImageType> = await api.get(
                `${imageUrls.main}/${ImageId}`
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    update: async (Image: PostImageType, ImageId: number) => {
        try {
            const response: AxiosResponse<ImageType> = await api.put(
                `${imageUrls.main}/${ImageId}`,
                Image
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    delete: async (ImageId: number) => {
        try {
            const response: AxiosResponse = await api.delete(
                `${imageUrls.main}/${ImageId}`
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    post: async (Image: any, CompanyId?: number) => {
        try {
            const response: AxiosResponse = await api.post(
                `${imageUrls.associate}/${CompanyId ? CompanyId : ''}`,
                Image
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};

export default userApi;
