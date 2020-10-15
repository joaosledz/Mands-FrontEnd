import { TypeTeam } from '../../models/department';
import guilhermeSimImage from '../../assets/fakeDataImages/employees/guilhermeSimoes.png';
import anaTartariImage from '../../assets/fakeDataImages/employees/anaTartari.png';

const employees: Array<TypeTeam> = [
    {
        id: 0,
        name: 'Ana Tartari',
        username: 'AnaTartari',
        image: anaTartariImage,
        jobTitle: 'Gerente',
    },
    {
        id: 1,
        name: 'Guilherme Simões',
        username: 'GuilhermeSimoes',
        image: guilhermeSimImage,
        jobTitle: 'Desenvolvedor Full-Stack',
    },
    {
        id: 2,
        name: 'Guilherme Simões',
        username: 'GuilhermeSimoes',
        image: guilhermeSimImage,
        jobTitle: 'Desenvolvedor Full-Stack',
    },
    {
        id: 3,
        name: 'Nicole Figueredo',
        username: 'NicoleFigueredo',
        image: anaTartariImage,
        jobTitle: 'Desenvolvedor Front-End',
    },
    {
        id: 4,
        name: 'Nicole Figueredo',
        username: 'NicoleFigueredo',
        image: anaTartariImage,
        jobTitle: 'Desenvolvedor Front-End',
    },
    {
        id: 5,
        name: 'Nicole Figueredo',
        username: 'NicoleFigueredo',
        image: anaTartariImage,
        jobTitle: 'Desenvolvedor Front-End',
    },
];

export default employees;
