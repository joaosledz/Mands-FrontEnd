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

export type UserCompanyType = {
    companyId: number;
    name: string;
    username: string;
    email: string;
    cnpj: string;
    pin: string;
    phone: string;
    imageId: number;
    image: string;
    userPermission?: TypeCompanyPermission;
    departments?: Array<TypeDepartment>;
    users?: Array<TypeMember>;
};
