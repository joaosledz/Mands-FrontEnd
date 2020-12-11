import api from '../api';
import { TypeProject, ProjectModel } from '../models/project';
import projectUrls from '../urls/project';

const projectApi = {
    show: (project_id: number) =>
        api.get<TypeProject>(projectUrls.show + project_id),

    findByDepartment: (company_username: string, department_name: string) =>
        api.get<Array<TypeProject>>(
            projectUrls.findByDepartment +
                `${company_username}/${department_name}`
        ),

    findByUser: (company_username: string, department_name: string) =>
        api.get<Array<TypeProject>>(
            projectUrls.findByUser + `${company_username}/${department_name}`
        ),

    create: (data: ProjectModel) => api.post(projectUrls.create, data),
};

export default projectApi;
