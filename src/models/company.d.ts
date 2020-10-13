import {ApiProps as DepartmentProps} from './department';

type CompanyType = {
    id: number;
    logo: string;
    name: string;
    president: string;
    cnpj: string;
    email: string;
    telephone: string;
    departments: Array<DepartmentProps>;
};

export default CompanyType;
