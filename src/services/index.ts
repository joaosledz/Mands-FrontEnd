import api from './api';
import { AxiosError } from 'axios';

import {
    LoginType,
    LoginModel,
    userType,
    RegisterModel,
} from './models/authentication';
import { UserCompanyType } from './models/company';

import authApi from './useCases/authentication';
import companyApi from './useCases/company';
import permissionApi from './useCases/companyPermission';

export { api, authApi, companyApi, permissionApi };
export type { AxiosError, LoginType, LoginModel, userType, RegisterModel };
export type { UserCompanyType };
