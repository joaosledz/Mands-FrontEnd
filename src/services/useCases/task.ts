import api from '../api';
import { SubmitTaskType } from '../models/task';
import taskUrls from '../urls/Task';

const tasksApi = {
    create: (companyId: number, data: SubmitTaskType) =>
        api.post(taskUrls.create + companyId, data),
};

export default tasksApi;
