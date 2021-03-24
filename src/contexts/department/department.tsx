import React, { createContext, useState, useCallback } from 'react';
import {
    TypeDepartment,
    departmentApi,
    departmentPermApi,
    TypeDepartmentPermission,
} from '../../services';

type TypeDepartmentData = {
    department: TypeDepartment | null;
    userPermDep: TypeDepartmentPermission;
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
    const [userPermDep, setUserPermDep] = useState<TypeDepartmentPermission>({
        depPermissionId: 1,
        name: 'Sem permissão',
        editDepartment: false,
        deleteDepartment: false,
        project: false,
        inviteUser: false,
        deleteUser: false,
        permission: false,
    });

    const getDepartmentData = useCallback(
        async (company_name: string, department_name: string) => {
            setLoading(true);
            try {
                if (department) {
                    const { data } = await departmentPermApi.getUserPermissions(
                        department.departmentId
                    );
                    setUserPermDep(data);
                }
                const response = await departmentApi.show(
                    company_name,
                    department_name
                );
                sessionStorage.setItem(
                    '@mands:department',
                    JSON.stringify(response.data)
                );
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
        [department]
    );

    const updateDepartment = useCallback((data: TypeDepartment) => {
        sessionStorage.setItem('@mands:department', JSON.stringify(data));
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
                userPermDep,
            }}
        >
            {children}
        </DepartmentContext.Provider>
    );
};

export default DepartmentContext;
