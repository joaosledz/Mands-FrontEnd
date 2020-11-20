import { UserCompanyType } from '../services';

const useCompany = () => {
    const companyDataAux = sessionStorage.getItem('@Mands:CompanyData');
    if (companyDataAux) {
        const companyData: UserCompanyType = JSON.parse(companyDataAux);
        return companyData;
    } else return null;
};

export default useCompany;
