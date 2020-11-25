import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
    api,
    AxiosError,
    authApi,
    LoginType,
    LoginModel,
    userType,
} from '../../services';
// import { connectHub } from '../../services/socket';

type AuthContextData = {
    signed: boolean;
    user: userType | null;
    login(data: LoginType): Promise<LoginModel>;
    logout(): void;
    loading: boolean;
    updateUser: (data: userType) => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const tokenKey = '@Mands:token';
    const [user, setUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState(true);
    // const [firstLogin, setFirstLogin] = useState(false);
    // const [haveLogged, setHaveLogged] = useState(true);

    useEffect(() => {
        setLoading(true);
        const loadStoragedData = () => {
            const storagedToken = localStorage.getItem(tokenKey);
            if (storagedToken) {
                api.defaults.headers[
                    'Authorization'
                ] = `Bearer ${storagedToken}`;
                authApi
                    .me()
                    .then(response => {
                        // console.log(response);
                        setUser(response.data);
                        // connectHub();
                        setLoading(false);
                    })
                    .catch((error: AxiosError) => {
                        // console.log(error);
                        if (error.response?.status === 401 && storagedToken) {
                            localStorage.removeItem(tokenKey);
                            setUser(null);
                        }
                        setLoading(false);
                    });
            } else setLoading(false);
        };
        loadStoragedData();
    }, []);

    const login = useCallback(async (data: LoginType) => {
        setLoading(true);
        try {
            const response = await authApi.login(data);
            // console.log(response);
            setUser(response.data.user);
            // SetUserId(res.data.company.id);
            api.defaults.headers[
                'Authorization'
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem(tokenKey, response.data.token);
            // connectHub();
            setLoading(false);
            return Promise.resolve(response.data);
        } catch (error) {
            // console.log(error);
            setLoading(false);
            return Promise.reject(error);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.clear();
        api.defaults.headers['Authorization'] = null;
        setUser(null);
    }, []);

    const updateUser = (data: userType) => {
        setUser(data);
    };

    return (
        <AuthContext.Provider
            value={{ signed: !!user, user, updateUser, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
