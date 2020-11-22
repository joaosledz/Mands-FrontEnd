import api from './api';
import { AxiosError } from 'axios';

import {
    LoginType,
    LoginModel,
    userType,
    RegisterModel,
    updateModel,
} from './models/authentication';
import { UserCompanyType } from './models/company';
import { TypeDepartment } from './models/department';
import { TypeProject } from './models/project';

import authApi from './useCases/authentication';
import userApi from './useCases/user';
import companyApi from './useCases/company';
import permissionApi from './useCases/companyPermission';
import departmentApi from './useCases/department';
import projectApi from './useCases/project';

export {
    api,
    authApi,
    userApi,
    companyApi,
    permissionApi,
    departmentApi,
    projectApi,
};
// Exportação das models de autenticação
export type {
    AxiosError,
    LoginType,
    LoginModel,
    userType,
    updateModel,
    RegisterModel,
};
// Exportação das models de empresa
export type { UserCompanyType };
// Exportação das models de departamento
export type { TypeDepartment };
// Exportação das models de projeto
export type { TypeProject };
