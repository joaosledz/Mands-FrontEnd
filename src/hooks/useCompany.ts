import { CompanyType } from '../services';

const useCompany = () => {
    const companyDataAux = sessionStorage.getItem('@Mands:CompanyData');
    if (companyDataAux) {
        const companyData: CompanyType = JSON.parse(companyDataAux);
        return companyData;
    } else return null;
};

export default useCompany;
