import api from '../api';
import { PostImageType, ImageType } from '../models/image';
import imageUrls from '../urls/image';

const userApi = {
    get: () => api.get(`${imageUrls.main}`),

    getById: (ImageId: number) => api.get(`${imageUrls.main}/${ImageId}`),

    post: (Image: FormData, company_id?: number) =>
        api.post<ImageType>(
            `${imageUrls.associate}/${company_id ? company_id : ''}`,
            Image
        ),

    update: (Image: PostImageType, ImageId: number) =>
        api.put(`${imageUrls.main}/${ImageId}`, Image),

    delete: (ImageId: number) => api.delete(`${imageUrls.main}/${ImageId}`),
};

export default userApi;
