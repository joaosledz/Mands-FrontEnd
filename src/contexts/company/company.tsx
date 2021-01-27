import React, { createContext, useState, useCallback } from 'react';
import { TypeCompany, companyApi, companyPermApi } from '../../services';

type TypeCompanyData = {
    company: TypeCompany | null;
    loading: boolean;
    getCompanyData: (company_username: string) => Promise<TypeCompany>;
    updateCompany: (data: TypeCompany) => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompanyContext = createContext<TypeCompanyData>({} as TypeCompanyData);

export const CompanyProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState<TypeCompany | null>(null);

    const getCompanyData = useCallback(async (company_username: string) => {
        setLoading(true);
        try {
            const response = await companyApi.showAllCompanyData(
                company_username
            );
            const permissionResponse = await companyPermApi.userPermissions(
                response.data.companyId
            );
            const data: TypeCompany = {
                ...response.data,
                userPermission: { ...permissionResponse.data },
            };
            sessionStorage.setItem('@mands:company', JSON.stringify(data));

            setCompany(data);
            return Promise.resolve(data);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateCompany = useCallback((data: TypeCompany) => {
        sessionStorage.setItem('@mands:company', JSON.stringify(data));
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

export default CompanyContext;
