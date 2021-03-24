import api from '../api';
import { TypeProjectPermModel } from '../models/projectPermission';

import urls from '../urls/projectPermission';

const projectPermApi = {
    create: (
        company_id: number,
        department_id: number,
        project_id: number,
        data: TypeProjectPermModel
    ) =>
        api.post(
            `${urls.create}/${company_id}/${department_id}/${project_id}`,
            data
        ),

    edit: (
        company_id: number,
        department_id: number,
        permission_id: number,
        data: TypeProjectPermModel
    ) =>
        api.put(
            `${urls.edit}/${company_id}/${department_id}/${permission_id}`,
            data
        ),

    delete: (
        company_id: number,
        department_id: number,
        project_id: number,
        permission_id: number
    ) =>
        api.delete(
            `${urls.delete}/${company_id}/${department_id}/${project_id}/${permission_id}`
        ),

    list: (company_id: number, department_id: number, project_id: number) =>
        api.get(`${urls.list}/${company_id}/${department_id}/${project_id}`),

    getUserPerm: (project_id: number) =>
        api.get(`${urls.getUserPerm}/${project_id}`),

    changeUserPerm: (
        company_id: number,
        department_id: number,
        project_id: number,
        user_id: number,
        newPerm_id: number
    ) =>
        api.put(
            `${urls.changeUserPerm}/${company_id}/${department_id}/${project_id}/${user_id}/${newPerm_id}`
        ),
};

export default projectPermApi;
