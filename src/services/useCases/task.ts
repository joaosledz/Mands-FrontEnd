import api from '../api';
import { SubmitTaskType, SubmitResponsible } from '../models/task';
import taskUrls from '../urls/task';

const tasksApi = {
    create: (companyId: number, data: SubmitTaskType) =>
        api.post(taskUrls.create + companyId, data),
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
