import React, { createContext, useState, useCallback } from 'react';
import { TypeDepartment, departmentApi } from '../../services';

type TypeDepartmentData = {
    department: TypeDepartment | null;
    loading: boolean;
    getDepartmentData: (
        company_name: string,
        department_name: string
    ) => Promise<TypeDepartment>;
    updateDepartment: (data: TypeDepartment) => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DepartmentContext = createContext<TypeDepartmentData>(
    {} as TypeDepartmentData
);

// const getStoragedDepartment = () => {
//     const departmentDataAux = sessionStorage.getItem('@Mands:department');
//     if (departmentDataAux) {
//         const companyData: TypeDepartment = JSON.parse(departmentDataAux);
//         return companyData;
//     } else return null;
// };

export const DepartmentProvider: React.FC = ({ children }) => {
    // const departmentData = getStoragedDepartment();

    const [loading, setLoading] = useState(true);
    const [department, setDepartment] = useState<TypeDepartment | null>(
        /* departmentData */ null
    );

    const getDepartmentData = useCallback(
        async (company_name: string, department_name: string) => {
            setLoading(true);
            try {
                const response = await departmentApi.show(
                    company_name,
                    department_name
                );
                // sessionStorage.setItem(
                //     '@Mands:department',
                //     JSON.stringify(response.data)
                // );
                setDepartment(response.data);
                return Promise.resolve(response.data);
                // alerta de troca de empresa bem sucedida
            } catch (error) {
                console.log(error);
                return Promise.reject(error);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const updateDepartment = useCallback((data: TypeDepartment) => {
        // sessionStorage.setItem('@Mands:department', JSON.stringify(data));
        setDepartment(data);
    }, []);

    return (
        <DepartmentContext.Provider
            value={{
                department,
                loading,
                setLoading,
                getDepartmentData,
                updateDepartment,
            }}
        >
            {children}
        </DepartmentContext.Provider>
    );
};

export default DepartmentContext;
