import api from '../api';
import { PostImageType, ImageType } from '../models/image';
import imageUrls from '../urls/image';

const imageApi = {
    get: () => api.get(`${imageUrls.main}`),

    getById: (ImageId: number) => api.get(`${imageUrls.main}/${ImageId}`),

    post: (Image: FormData, company_id?: number, project_id?: number) => {
        if (project_id)
            return api.post<ImageType>(
                imageUrls.associate + `/${company_id}/${project_id}`,
                Image
            );
        else if (company_id)
            return api.post<ImageType>(
                imageUrls.associate + `/${company_id}`,
                Image
            );
        else return api.post<ImageType>(imageUrls.associate, Image);
    },

    update: (Image: PostImageType, ImageId: number) =>
        api.put(`${imageUrls.main}/${ImageId}`, Image),

    delete: (ImageId: number) => api.delete(`${imageUrls.main}/${ImageId}`),
};

export default imageApi;
