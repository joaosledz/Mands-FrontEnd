import api from '../api';
import {
    SubmitTaskType,
    SubmitResponsible,
    SubmitDeleteTask,
    SubmitChangeSession,
    UpdateSubtaskType,
    updateTaskPositionType,
    CreateSubtaskType,
} from '../models/task';
import taskUrls from '../urls/tasks';

const tasksApi = {
    //Taks
    create: (companyId: number, data: SubmitTaskType) =>
        api.post(taskUrls.create + companyId, data),
    update: (companyId: number, taskId: string, data: any) =>
        api.put(taskUrls.update + `${companyId}/${taskId}`, data),
    delete: (taskId: number, data: SubmitDeleteTask) =>
        api.delete(
            taskUrls.delete +
                `${taskId}/${data.departmentId}/${data.projectId}/${data.companyId}`
        ),
    associateResponsible: (
        companyId: number,
        data: SubmitResponsible,
        taskId: number
    ) =>
        api.post(
            taskUrls.associateResponsible + `${companyId}/${taskId}`,
            data
        ),
    deleteResponsible: (
        companyId: number,
        taskId: number,
        departmentId: number,
        userId: number,
        projectId: number
    ) =>
        api.delete(
            taskUrls.deleteResponsible +
                `${companyId}/${taskId}/${departmentId}/${projectId}/${userId}`
        ),
    //Deslocamento
    changeSession: (
        taskId: number,
        sessionId: string,
        data: SubmitChangeSession
    ) => api.put(taskUrls.changeSession + `${taskId}/${sessionId}`, data),
    updatePosition: (
        sessionId: string,
        projectId: number,
        data: updateTaskPositionType
    ) => api.put(taskUrls.updatePosition + `${sessionId}/${projectId}`, data),
    //Dependências
    createDependency: (companyId: number, taskId: string, data: any) =>
        api.post(taskUrls.createDependency + `${companyId}/${taskId}`, data),
    //Ainda tem que ser alterado na API
    // deleteDependency: (companyId: number, dependencyId: string, taskId: string, departmentId: number, projectId: number )  =>
    // api.delete(taskUrls.deleteDependency + `${companyId}/${dependencyId}/${taskId}/${departmentId}/${projectId}`),
    //Subtasks
    createSubtask: (
        companyId: number,
        taskId: string,
        data: CreateSubtaskType
    ) => api.post(taskUrls.createSubtask + `${companyId}/${taskId}`, data),
    updateSubtask: (subtaskId: string, data: UpdateSubtaskType) =>
        api.put(taskUrls.updateSubtask + subtaskId, data),
    //Ainda tem que ser alterado na API
    deleteSubtask: (
        subtaskId: string,
        companyId: number,
        departmentId: number,
        projectId: number
    ) =>
        api.delete(
            taskUrls.deleteSubtask +
                `${companyId}/${subtaskId}/${departmentId}/${projectId}`
        ),
};

export default tasksApi;
