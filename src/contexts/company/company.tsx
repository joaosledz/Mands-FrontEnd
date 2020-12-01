import React, { createContext, useState, useContext, useCallback } from 'react';
import { UserCompanyType, companyApi, permissionApi } from '../../services';

type TypeCompanyData = {
    company: UserCompanyType | null;
    loading: boolean;
    getCompanyData: (company_username: string) => Promise<UserCompanyType>;
    updateCompany: (data: UserCompanyType) => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompanyContext = createContext<TypeCompanyData>({} as TypeCompanyData);

const getStoragedCompany = () => {
    const companyDataAux = sessionStorage.getItem('@Mands:CompanyData');
    if (companyDataAux) {
        const companyData: UserCompanyType = JSON.parse(companyDataAux);
        return companyData;
    } else return null;
};

export const CompanyProvider: React.FC = ({ children }) => {
    const companyData = getStoragedCompany();

    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState<UserCompanyType | null>(companyData);

    const getCompanyData = useCallback(async (company_username: string) => {
        setLoading(true);
        try {
            const response = await companyApi.showAllCompanyData(
                company_username
            );
            const permissionResponse = await permissionApi.userPermissions(
                response.data.companyId
            );
            const data: UserCompanyType = {
                ...response.data,
                userPermission: { ...permissionResponse.data },
            };
            // console.log(data);
            sessionStorage.setItem('@Mands:CompanyData', JSON.stringify(data));
            setCompany(data);
            return Promise.resolve(data);
            // alerta de troca de empresa bem sucedida
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateCompany = useCallback((data: UserCompanyType) => {
        setCompany(data);
    }, []);

    return (
        <CompanyContext.Provider
            value={{
                company,
                loading,
                setLoading,
                getCompanyData,
                updateCompany,
            }}
        >
            {children}
        </CompanyContext.Provider>
    );
};

const useCompany = () => {
    const context = useContext(CompanyContext);
    return context;
};

export default useCompany;
