import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from 'react';
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
        setLoading(true);
        const loadStoragedData = () => {
            const storagedToken = localStorage.getItem('@Mands:token');
            if (storagedToken) {
                api.defaults.headers[
                    'Authorization'
                ] = `Bearer ${storagedToken}`;
                auth.me()
                    .then(response => {
                        // console.log(response);
                        //         SetUserId(response.data.company.id);
                        setUser(response.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        // console.log(error);
                        setLoading(false);
                    });
            } else setLoading(false);
        };
        loadStoragedData();
    }, []);

    const login = useCallback(async (data: LoginType) => {
        setLoading(true);
        try {
            const response = await auth.login(data);
            // console.log(response);
            setUser(response.data.user);
            // SetUserId(res.data.company.id);
            api.defaults.headers[
                'Authorization'
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem('@Mands:token', response.data.token);
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

    return (
        <AuthContext.Provider
            value={{ signed: !!user, user, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
