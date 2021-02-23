import api from './api';
import { AxiosError } from 'axios';

import authApi from './useCases/authentication';
import userApi from './useCases/user';
import companyApi from './useCases/company';
import companyPermApi from './useCases/companyPermission';
import departmentApi from './useCases/department';
import departmentPermApi from './useCases/departmentPermission';
import projectApi from './useCases/project';
import imageApi from './useCases/image';
import taskApi from './useCases/task';
import sessionApi from './useCases/session';

export * from './models/authentication';
export * from './models/company';
export * from './models/companyPermission';
export * from './models/department';
export * from './models/departmentPermission';
export * from './models/project';
export * from './models/image';
export * from './models/task';
export * from './models/session';

export {
    api,
    authApi,
    userApi,
    companyApi,
    companyPermApi,
    departmentApi,
    departmentPermApi,
    projectApi,
    imageApi,
    taskApi,
    sessionApi,
};

export type { AxiosError };
