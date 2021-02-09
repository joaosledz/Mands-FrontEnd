import api from '../api';
import sessionUrls from '../urls/session';
import {
    sessionType,
    updateSessionPositionType,
    deleteSessionType,
} from '../models/session';
const tasksApi = {
    create: (projectId: number, data: sessionType) =>
        api.post(sessionUrls.create + projectId, data),
    delete: (sessionId: string, data: deleteSessionType) =>
        api.delete(
            sessionUrls.delete +
                sessionId +
                `/${data.companyId}/${data.departmentId}/${data.projectId}`
        ),
    update: (projectId: number, sessionId: string, data: sessionType) =>
        api.put(sessionUrls.update + `${projectId}/${sessionId}`, data),
    updatePosition: (projectId: number, data: updateSessionPositionType) =>
        api.put(sessionUrls.updatePosition + projectId, data),
};

export default tasksApi;
