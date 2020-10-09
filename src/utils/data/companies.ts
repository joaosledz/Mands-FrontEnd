export const company = {
    id: 1,
    name: 'IT - Inteligência e Tecnologia',
    president: 'Guto Sobrenome',
    cnpj: '82.739.380/0001-45',
    email: 'contato@inteligencia&tecnologia.com.br',
    telephone: '(71) 99951-4381',
};

const companies = [
    { ...company },
    {
        id: 2,
        name: 'Facebook',
        president: 'Mark Zuckeberg',
        cnpj: '82.739.380/0001-45',
        email: 'support@facebook.com',
        telephone: '',
    },
];

export default companies;
