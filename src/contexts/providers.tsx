import React from 'react';
import { AuthProvider } from './auth';
import { CompanyProvider } from './company/company';
import { DepartmentProvider } from './department/department';
import { ProjectProvider } from './project/project';

const AppProviders: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            <CompanyProvider>
                <DepartmentProvider>
                    <ProjectProvider>{children}</ProjectProvider>
                </DepartmentProvider>
            </CompanyProvider>
        </AuthProvider>
    );
};

export default AppProviders;
