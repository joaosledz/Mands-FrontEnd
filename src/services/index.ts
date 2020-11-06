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

// let userId;
// export const setUserId = (user_id: number) => {
//     return (userId = user_id);
// };

export { api, authApi, companyApi };
export type { AxiosError, LoginType, LoginModel, userType, RegisterModel };
export type { UserCompanyType };
