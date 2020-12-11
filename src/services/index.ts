import api from './api';
import { AxiosError } from 'axios';

import {
    LoginType,
    LoginModel,
    userType,
    RegisterModel,
    updateModel,
} from './models/authentication';
import { UserCompanyType, CompanyUpdateModel } from './models/company';
import {
    TypeDepartment,
    TypeMember,
    DepartmentModel,
} from './models/department';
import { TypeProject } from './models/project';
import { PostImageType, ImageErrorType, ImageType } from './models/image';

import authApi from './useCases/authentication';
import userApi from './useCases/user';
import companyApi from './useCases/company';
import permissionApi from './useCases/companyPermission';
import departmentApi from './useCases/department';
import projectApi from './useCases/project';
import imageApi from './useCases/image';

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
    userType,
    updateModel,
    RegisterModel,
};
// Exportação das models de empresa
export type { UserCompanyType, CompanyUpdateModel };
// Exportação das models de departamento
export type { TypeDepartment, TypeMember, DepartmentModel };
// Exportação das models de projeto
export type { TypeProject };
// Exportação das models de imagem
export type { PostImageType, ImageErrorType, ImageType };
