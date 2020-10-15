import DevIcon from '../../assets/selectableIcons/webPrograming.svg';
import guilhermeSimImage from '../../assets/fakeDataImages/employees/guilhermeSimoes.png';
import seuZeImage from '../../assets/fakeDataImages/projects/seuZe.png';

const departments = [
    {
        id: 1,
        name: 'Desenvolvedores',
        icon: DevIcon,
        description: 'Sou o departamento de desenvolvedores',
        email: 'desenvolvedores@it.com',
        phone: '71 999518723',
        team: [
            {
                id: 0,
                name: 'Guilherme Simões',
                username: 'GuilhermeSimoes',
                image: guilhermeSimImage,
                jobTitle: 'Desenvolvedor Full-Stack',
            },
            {
                id: 3,
                name: 'Nicole Figueredo',
                username: 'NicoleFigueredo',
                image: guilhermeSimImage,
                jobTitle: 'Desenvolvedor Front-End',
            },
            {
                id: 2,
                name: 'Nicole Figueredo',
                username: 'NicoleFigueredo',
                image: guilhermeSimImage,
                jobTitle: 'Desenvolvedor Front-End',
            },
        ],
        projects: [
            {
                // id: number,
                name: 'Seu Zé',
                icon: seuZeImage,
            },
            {
                // id: number,
                name: 'Seu Zé',
                icon: seuZeImage,
            },
            {
                // id: number,
                name: 'Seu Zé',
                icon: seuZeImage,
            },
        ],
    },
    {
        id: 2,
        name: 'Financeiro',
        icon: DevIcon,
        description: 'Sou o departamento do financeiro',
        email: 'financeiro@it.com',
        phone: '71 999518723',
        team: [
            // {
            //     id: number;
            //     name: 'Guilherme Simões',
            //     image: guilhermeSimImage,
            //     jobTitle: 'Desenvolvedor Full-Stack',
            // },
        ],
        projects: [
            // {
            // id: number,
            // name: 'Seu Zé',
            // icon: seuZeImage,
            // },
        ],
    },
];

export default departments;
