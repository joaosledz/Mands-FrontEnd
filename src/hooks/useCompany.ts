import {useHistory} from 'react-router-dom';

function useCompany() {

        const history = useHistory();

        const companyData = sessionStorage.getItem('@Mands:CompanyData');
        if (companyData) return JSON.parse(companyData)
        else history.push('/escolha-da-empresa');
}

export default useCompany;