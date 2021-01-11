import { IRoutes } from '../models/iRoutes';

import CompanyIcon from '../../../../../../../assets/icons/business.svg';
import DepartmentIcon from '../../../../../../../assets/icons/department.svg';
import EmployeesIcon from '../../../../../../../assets/icons/employees.svg';
import CalendarIcon from '../../../../../../../assets/icons/calendar.svg';

const Routes: IRoutes = [
    {
        name: 'Empresa',
        icon: CompanyIcon,
        iconAlt: 'Ícone de uma empresa',
        page: 'detalhes',
    },
    {
        name: 'Departamentos',
        icon: DepartmentIcon,
        iconAlt: 'Ícone da estrutura de empresa',
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
