import React from 'react';
import { AuthProvider } from './auth';
import { CompanyProvider } from './company/company';
import { DepartmentProvider } from './department/department';

const AppProviders: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            <CompanyProvider>
                <DepartmentProvider>{children}</DepartmentProvider>
            </CompanyProvider>
        </AuthProvider>
    );
};

export default AppProviders;
