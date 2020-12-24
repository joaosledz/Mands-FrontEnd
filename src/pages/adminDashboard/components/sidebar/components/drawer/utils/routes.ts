import { IRoutes } from '../models/iRoutes';

import CompanyIcon from '../../../../../../../assets/icons/business.svg';
import EmployeesIcon from '../../../../../../../assets/icons/employees.svg';
import CalendarIcon from '../../../../../../../assets/icons/calendar.svg';
import { UserCompanyType } from '../../../../../../../services';

let companyUsername = '';

export const setCompanyUsername = (company_username: string) =>
    (companyUsername = company_username);

const Routes: IRoutes = [
    {
        name: 'Departamentos',
        icon: CompanyIcon,
        iconAlt: 'Ícone de uma empresa',
        page: 'departamentos',
    },
    {
        name: 'Funcionários',
        icon: EmployeesIcon,
        iconAlt: 'Ícone de três pessoas',
        page: 'funcionarios',
    },
    {
        name: 'Calendário',
        icon: CalendarIcon,
        iconAlt: 'Ícone de um calendário',
        page: 'calendario',
    },
];

export default Routes;
