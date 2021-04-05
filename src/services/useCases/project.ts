import api from '../api';
import {
    TypeProject,
    ProjectModel,
    TypeUserPerm,
    TypeEmployee,
} from '../index';
import projectUrls from '../urls/project';

const projectApi = {
    show: (project_id: number) =>
        api.get<TypeProject>(projectUrls.show + project_id),

    findByDepartment: (department_id: number) =>
        api.get<Array<TypeProject>>(
            projectUrls.findByDepartment + `${department_id}`
        ),

    findByUser: (companyId: number, departmentId: number) =>
        api.get<Array<TypeProject>>(
            projectUrls.findByUser + `${companyId}/${departmentId}`
        ),

    create: (data: ProjectModel, company_id: number, department_id: number) =>
        api.post(`${projectUrls.create}${company_id}/${department_id}`, data),

    update: (
        company_id: number,
        department_id: number,
        project_id: number,
        data: ProjectModel
    ) =>
        api.put<TypeProject>(
            projectUrls.update + `${company_id}/${department_id}/${project_id}`,
            data
        ),

    remove: (company_id: number, department_id: number, project_id: number) =>
        api.delete(
            projectUrls.remove + `${company_id}/${department_id}/${project_id}`
        ),

    getBoardData: (project_id: number) =>
        api.get(projectUrls.getBoardData + project_id),

    getEmployees: (project_id: number | string) =>
        api.get<TypeEmployee[]>(projectUrls.getEmployees + project_id),

    associateEmployees: (
        project_id: number,
        company_id: number,
        department_id: number,
        data: Array<TypeUserPerm>
    ) =>
        api.post(
            `${projectUrls.associateUsers}/${company_id}/${department_id}/${project_id}`,
            data
        ),

    removeEmployee: (
        company_id: number,
        department_id: number,
        project_id: number,
        employee_id: number
    ) =>
        api.delete(
            `${projectUrls.desassociateUser}/${company_id}/${department_id}/${project_id}/${employee_id}`
        ),
};

export default projectApi;
