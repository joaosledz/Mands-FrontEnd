import React, { createContext, useState, useEffect, useContext } from 'react';

// import ApiService, { SetUserId } from '../../services';
import { api, auth, LoginType, LoginModel, userType } from '../../services';

type AuthContextData = {
    signed: boolean;
    user: userType | null;
    login(data: LoginType): Promise<LoginModel>;
    logout(): void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState(true);
    // const [firstLogin, setFirstLogin] = useState(false);
    // const [haveLogged, setHaveLogged] = useState(true);

    useEffect(() => {
        // setLoading(true);
        const loadStoragedData = () => {
            const storagedToken = localStorage.getItem('@Mands:token');

            if (storagedToken) {
                // api.defaults.headers[
                //     'Authorization'
                // ] = `Bearer ${storagedToken}`;
                // ApiService.GetUserData()
                //     .then((response) => {
                //         // console.log(response.data);
                //         SetUserId(response.data.company.id);
                //         setUser(response.data);
                //         setLoading(false);
                //     })
                //     .catch((error) => {
                //         // console.log(error);
                //         setLoading(false);
                //     });
            } else setLoading(false);
        };
        loadStoragedData();
    }, []);

    const login = async (data: LoginType) => {
        setLoading(true);
        try {
            const response = await auth.login(data);
            console.log(response);
            setUser(response.data.user);
            // SetUserId(res.data.company.id);
            api.defaults.headers[
                'Authorization'
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem('@SeuZe:token', response.data.token);
            setLoading(false);

            return Promise.resolve(response.data);
        } catch (error) {
            console.log(error);
            setLoading(false);
            return Promise.reject(error);
        }
    };

    const logout = () => {
        // return ApiService.Logout(refreshToken)
        //     .then((res) => {
        //         // console.log(res);
        //         localStorage.clear();
        //         api.defaults.headers['Authorization'] = null;
        //         // localStorage.removeItem('@SeuZe:refreshToken');
        //         // localStorage.removeItem('@SeuZe:token');
        //         // localStorage.removeItem('@SeuZe:user');
        //         setUser(null);
        //     })
        //     .catch((error) => {
        //         // console.log(error);
        //         return Promise.reject(error);
        //     });
    };

    return (
        <AuthContext.Provider
            value={{ signed: !!user, user, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// export default AuthContext;

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
