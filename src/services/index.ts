import api from './api';

import { LoginType, LoginModel, userType } from './models/authentication';
import auth from './useCases/authentication';

// let userId;
// export const setUserId = (user_id: number) => {
//     return (userId = user_id);
// };

export { api, auth };
export type { LoginType, LoginModel, userType };
