import api from '../api';
import { TypeUser } from '../models/authentication';
import userUrls from '../urls/user';

const userApi = {
    show: (credential: string) => api.get<TypeUser>(userUrls.show + credential),
};

export default userApi;
