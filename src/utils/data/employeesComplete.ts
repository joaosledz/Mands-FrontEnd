import { Employee } from '../../models/department';
import guilhermeSimImage from '../../assets/fakeDataImages/employees/guilhermeSimoes.png';
import anaTartariImage from '../../assets/fakeDataImages/employees/anaTartari.png';

const employees: Array<Employee> = [
    {
        id: 0,
        name: 'Ana Tartari',
        username: 'AnaTartari',
        cpf: '565.503.750-53',
        admission: '11-07-2020',
        image: anaTartariImage,
        jobTitle: 'Gerente',
    },
    {
        id: 1,
        name: 'Guilherme Simões',
        username: 'GuilhermeSimoes',
        cpf: '565.503.750-53',
        admission: '01-07-2020',
        image: guilhermeSimImage,
        jobTitle: 'Desenvolvedor Full-Stack',
    },
    {
        id: 2,
        name: 'Guilherme Simões',
        username: 'GuilhermeSimoes',
        cpf: '465.503.750-73',
        admission: '11-07-2020',
        image: guilhermeSimImage,
        jobTitle: 'Desenvolvedor Full-Stack',
    },
    {
        id: 3,
        name: 'Nicole Figueredo',
        username: 'NicoleFigueredo',
        cpf: '525.503.750-53',
        admission: '11-07-2020',
        image: anaTartariImage,
        jobTitle: 'Desenvolvedor Front-End',
    },
    {
        id: 4,
        name: 'Nicole Figueredo',
        username: 'NicoleFigueredo',
        cpf: '565.503.750-53',
        admission: '15-07-2020',
        image: anaTartariImage,
        jobTitle: 'Desenvolvedor Front-End',
    },
    {
        id: 5,
        name: 'Nicole Figueredo',
        username: 'NicoleFigueredo',
        cpf: '565.503.750-53',
        admission: '10-07-2020',
        image: anaTartariImage,
        jobTitle: 'Desenvolvedor Front-End',
    },
    {
        id: 6,
        name: 'Alfonso Lambert',
        username: 'AlfonsoLambert',
        cpf: '565.503.750-53',
        admission: '10-07-2020',
        image: anaTartariImage,
        jobTitle: 'Desenvolvedor Back-End',
    },
    {
        id: 7,
        name: 'João Felipe',
        username: 'JoaoFelipe',
        cpf: '565.503.750-53',
        admission: '10-07-2020',
        image: anaTartariImage,
        jobTitle: 'Desenvolvedor Back-End',
    },
];

export default employees;
