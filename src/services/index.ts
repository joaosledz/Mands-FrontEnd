import api from './api';
import { AxiosError } from 'axios';
import { LoginType, LoginModel, userType } from './models/authentication';
import authApi from './useCases/authentication';
import companyApi from './useCases/company';

// let userId;
// export const setUserId = (user_id: number) => {
//     return (userId = user_id);
// };

export { api, authApi, companyApi };
export type { AxiosError, LoginType, LoginModel, userType };
