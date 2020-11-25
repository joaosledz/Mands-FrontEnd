import { createContext } from 'react';
import { UserCompanyType } from '../../../../services';
type TypeCompanyData = {
    company: UserCompanyType | null;
    loading: boolean;
};
export default createContext<TypeCompanyData>({} as TypeCompanyData);
