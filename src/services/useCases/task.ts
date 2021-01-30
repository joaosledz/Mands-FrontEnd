import api from '../api';
import {
    SubmitTaskType,
    SubmitResponsible,
    SubmitDeleteTask,
    SubmitChangeSession,
} from '../models/task';
import taskUrls from '../urls/task';

const tasksApi = {
    create: (companyId: number, data: SubmitTaskType) =>
        api.post(taskUrls.create + companyId, data),
    delete: (taskId: number, data: SubmitDeleteTask) =>
        api.delete(
            taskUrls.delete +
                `${taskId}/${data.departmentId}/${data.projectId}/${data.companyId}`
        ),
    changeSession: (
        taskId: number,
        sessionId: string,
        data: SubmitChangeSession
    ) => api.put(taskUrls.changeSession + `${taskId}/${sessionId}`, data),
    associateResponsible: (
        companyId: number,
        data: SubmitResponsible,
        taskId: number
    ) =>
        api.post(
            taskUrls.associateResponsible + companyId + '/' + taskId,
            data
        ),
};

export default tasksApi;
