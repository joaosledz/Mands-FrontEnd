import api from './api';
import { AxiosError } from 'axios';

import {
    LoginType,
    LoginModel,
    TypeUser,
    RegisterModel,
    updateModel,
} from './models/authentication';

import authApi from './useCases/authentication';
import userApi from './useCases/user';
import companyApi from './useCases/company';
import permissionApi from './useCases/companyPermission';
import departmentApi from './useCases/department';
import projectApi from './useCases/project';
import imageApi from './useCases/image';

export * from './models/company';
export * from './models/department';
export * from './models/project';
export * from './models/image';

export {
    api,
    authApi,
    userApi,
    companyApi,
    permissionApi,
    departmentApi,
    projectApi,
    imageApi,
};
// Exportação das models de autenticação
export type {
    AxiosError,
    LoginType,
    LoginModel,
    TypeUser,
    updateModel,
    RegisterModel,
};
