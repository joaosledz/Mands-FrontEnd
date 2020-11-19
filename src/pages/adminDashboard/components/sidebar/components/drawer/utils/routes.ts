import { IRoutes } from '../models/iRoutes';

import CompanyIcon from '../../../../../../../assets/icons/business.svg';
import EmployeesIcon from '../../../../../../../assets/icons/employees.svg';
import CalendarIcon from '../../../../../../../assets/icons/calendar.svg';
import { UserCompanyType } from '../../../../../../../services';
const getCompanyUsername = () => {
    let data = sessionStorage.getItem('@Mands:CompanyData');
    if (data) {
        const dataAux: UserCompanyType = JSON.parse(data);
        return dataAux.username;
    }
};
const username = getCompanyUsername();
const Routes: IRoutes = [
    {
        name: 'Departamentos',
        icon: CompanyIcon,
        iconAlt: 'Ícone de uma empresa',
        path: `/admin/${username}/departamentos`,
        page: 'departamentos',
    },
    {
        name: 'Funcionários',
        icon: EmployeesIcon,
        iconAlt: 'Ícone de três pessoas',
        path: `/admin/${username}/funcionarios`,
        page: 'funcionarios',
    },
    {
        name: 'Calendário',
        icon: CalendarIcon,
        iconAlt: 'Ícone de um calendário',
        path: `/admin/${username}/calendario`,
        page: 'calendario',
    },
];

export default Routes;
