import api from '../api';
import {
    LoginType,
    LoginModel,
    TypeUser,
    RegisterModel,
    updateModel,
} from '../models/authentication';
import authUrls from '../urls/authentication';

const authApi = {
    login: (data: LoginType) => api.post<LoginModel>(authUrls.login, data),

    me: (token?: string) =>
        api.get<TypeUser>(
            authUrls.me,
            token
                ? { headers: { Authorization: `Bearer ${token}` } }
                : undefined
        ),

    verifyUsername: (username: string) =>
        api.get(authUrls.verifyUsername + `/${username}`),

    register: (data: RegisterModel) =>
        api.post<TypeUser>(authUrls.register, data),

    update: (data: updateModel) => api.put<TypeUser>(authUrls.update, data),

    confirmAccount: (token: string) =>
        api.put(
            authUrls.confirmAccount,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ),

    resendConfirmEmail: (credential: string) =>
        api.post(authUrls.resendConfirmEmail, { credential }),

    recoverPassword: (email: string) =>
        api.post(authUrls.changePassword, {
            email,
        }),

    changePassword: (password: string, token: string) =>
        api.put(
            authUrls.changePassword,
            {
                password,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ),
};

export default authApi;
