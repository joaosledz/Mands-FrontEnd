import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
    api,
    AxiosError,
    authApi,
    LoginType,
    LoginModel,
    TypeUser,
} from '../../services';
import encrypt from '../../utils/functions/encrypt';
import sha1 from 'sha1';
import snackbarUtils from '../../utils/functions/snackbarUtils';
// import { connectHub } from '../../services/socket';

type AuthContextData = {
    signed: boolean;
    user: TypeUser | null;
    login(data: LoginType): Promise<LoginModel>;
    thirdPartyLogin(data: LoginType, imageUrl?: string): Promise<LoginModel>;
    logout(): void;
    loading: boolean;
    updateUser: (data: TypeUser) => void;
    getGithubAccess: (data: TypeGithub) => Promise<string>;
};

type TypeGithub = {
    clientId: string;
    clientSecret: string;
    code: string;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const tokenKey = '@Mands:token';
    const [user, setUser] = useState<TypeUser | null>(null);
    const [loading, setLoading] = useState(true);
    // const [firstLogin, setFirstLogin] = useState(false);
    // const [haveLogged, setHaveLogged] = useState(true);

    useEffect(() => {
        const loadStoragedData = async () => {
            const storagedToken = localStorage.getItem(tokenKey);
            if (storagedToken) {
                api.defaults.headers[
                    'Authorization'
                ] = `Bearer ${storagedToken}`;

                try {
                    setLoading(true);
                    const response = await authApi.me();
                    setUser(response.data);
                } catch (err) {
                    const error: AxiosError = err;
                    if (error.response?.status === 401 && storagedToken) {
                        localStorage.removeItem(tokenKey);
                        setUser(null);
                        snackbarUtils.info(
                            'Seu token de acesso expirou, faça o Login novamente.'
                        );
                    }
                } finally {
                    setLoading(false);
                }
            } else setLoading(false);
        };
        loadStoragedData();
    }, []);

    const thirdPartyLogin = useCallback(
        async (data: LoginType, imageUrl?: string) => {
            try {
                const userData: LoginType = {
                    ...data,
                    password: sha1(data.password),
                };
                const response = await authApi.login(userData);
                const newUser = response.data.user;
                // console.log(response);
                setLoading(true);

                if (!imageUrl) setUser(response.data.user);
                else
                    setUser({
                        ...newUser,
                        image: { ...newUser.image, path: imageUrl },
                    });

                api.defaults.headers[
                    'Authorization'
                ] = `Bearer ${response.data.token}`;
                localStorage.setItem(tokenKey, response.data.token);
                return Promise.resolve(response.data);
            } catch (error) {
                // console.log(error);
                return Promise.reject(error);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const login = useCallback(async (data: LoginType) => {
        const userData: LoginType = {
            ...data,
            password: encrypt(data.password),
        };
        try {
            const response = await authApi.login(userData);
            // console.log(response);
            setLoading(true);
            setUser(response.data.user);
            api.defaults.headers[
                'Authorization'
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem(tokenKey, response.data.token);
            return Promise.resolve(response.data);
        } catch (error) {
            // console.log(error);
            return Promise.reject(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.clear();
        api.defaults.headers['Authorization'] = null;
        setUser(null);
    }, []);

    const updateUser = (data: TypeUser) => {
        setUser(data);
    };

    const getGithubAccess = async (data: TypeGithub) => {
        try {
            const {
                data: { access_token },
            } = await authApi.getGithubAccess(
                data.clientId,
                data.clientSecret,
                data.code
            );
            return Promise.resolve(access_token);
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                updateUser,
                login,
                thirdPartyLogin,
                logout,
                loading,
                getGithubAccess,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
