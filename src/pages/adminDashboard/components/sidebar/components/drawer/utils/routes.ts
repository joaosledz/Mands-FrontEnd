import { IRoutes } from '../models/iRoutes';

import CompanyIcon from '../../../../../../../assets/icons/business.svg';
import EmployeesIcon from '../../../../../../../assets/icons/employees.svg';
import CalendarIcon from '../../../../../../../assets/icons/calendar.svg';

const Routes: IRoutes = [
    {
        name: 'Departamentos',
        icon: CompanyIcon,
        iconAlt: 'Ícone de uma empresa',
        path: '/admin/departamentos',
        page: 'departamentos',
    },
    {
        name: 'Funcionários',
        icon: EmployeesIcon,
        iconAlt: 'Ícone de três pessoas',
        path: '/admin/funcionarios',
        page: 'funcionarios',
    },
    {
        name: 'Calendário',
        icon: CalendarIcon,
        iconAlt: 'Ícone de um calendário',
        path: '/admin/calendario',
        page: 'calendario',
    },
];

export default Routes;
