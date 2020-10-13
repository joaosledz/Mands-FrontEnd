import ITLogo from '../../assets/fakeDataImages/companiesImages/IT2.png';
import departmentsData from './departments';

export const company = {
    id: 1,
    logo: ITLogo,
    name: 'IT - Inteligência e Tecnologia',
    president: 'Guto Sobrenome',
    cnpj: '82.739.380/0001-45',
    email: 'contato@inteligencia&tecnologia.com.br',
    telephone: '(71) 99951-4381',
    departments: departmentsData
};

const companies = [
    { ...company },
    {
        id: 2,
        logo: ITLogo,
        name: 'Facebook',
        president: 'Mark Zuckeberg',
        cnpj: '82.739.380/0001-45',
        email: 'support@facebook.com',
        telephone: '',
        departments: departmentsData,
    },
];

export default companies;
