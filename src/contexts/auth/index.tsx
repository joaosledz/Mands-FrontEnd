import React, { createContext, useState, useEffect, useContext } from 'react';

// import ApiService, { SetUserId } from '../../variables/ApiService';
// import api from '../../services/api';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    // login(data: object): Promise<void>;
    logout(): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState(null);
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

    // const login = (data: object) => {
    //     setLoading(true);
    //     // return ApiService.Logar(data)
    //     //     .then((res) => {
    //     //         // console.log(res.data.company);
    //     //         setUser(res.data);
    //     //         SetUserId(res.data.company.id);
    //     //         api.defaults.headers[
    //     //             'Authorization'
    //     //         ] = `Bearer ${res.data.Login.token}`;

    //     //         localStorage.setItem('@SeuZe:token', res.data.Login.token);
    //     //         localStorage.setItem(
    //     //             '@SeuZe:refreshToken',
    //     //             res.data.Login.refreshToken
    //     //         );
    //     //         setLoading(false);
    //     //     })
    //     //     .catch((error) => {
    //     //         console.log(error);
    //     //         setLoading(false);
    //     //         return Promise.reject(error);
    //     //     });
    //     return Promise.resolve(data);
    // };

    const logout = () => {
        const refreshToken = localStorage.getItem('@Mands:refreshToken');
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
        <AuthContext.Provider value={{ signed: !!user, user, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// export default AuthContext;

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
