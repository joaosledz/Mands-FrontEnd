import { useContext } from 'react';
import CompanyContext from '../contexts/company/company';

const useCompany = () => {
    const context = useContext(CompanyContext);
    return context;
};

export default useCompany;
