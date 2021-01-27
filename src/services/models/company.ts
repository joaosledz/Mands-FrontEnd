import { TypeCompanyPermission } from './companyPermission';
import { TypeDepartment, TypeMember } from './department';

export type CompanyModel = {
    company: {
        name: string;
        username: string;
        phone: string;
        email: string;
        cnpj?: string;
    };
};
export type CompanyUpdateModel = {
    name: string;
    phone: string;
    email: string;
};

export type TypeCompany = {
    companyId: number;
    name: string;
    username: string;
    email: string;
    cnpj: string;
    pin: string;
    phone: string;
    imagePath: string;
    userPermission?: TypeCompanyPermission;
    departments?: Array<TypeDepartment>;
    users?: Array<TypeMember>;
};

export type TypeCompAssociateModel = {
    permissionId: number;
    userId: number;
};
