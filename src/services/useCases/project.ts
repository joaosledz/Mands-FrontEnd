import api from '../api';
import { TypeProject, ProjectModel } from '../models/project';
import projectUrls from '../urls/project';

const projectApi = {
    findByDepartment: async (
        company_username: string,
        department_name: string
    ) => {
        try {
            const response = await api.get<Array<TypeProject>>(
                projectUrls.findByDepartment +
                    `${company_username}/${department_name}`
            );
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
    create: async (data: ProjectModel) => {
        try {
            const response = await api.post(projectUrls.create, data);
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};

export default projectApi;
