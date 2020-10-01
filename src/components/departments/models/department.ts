export type TypeTeam = {
    // id: number;
    name: string;
    image: string;
    jobTitle: string;
};

export type TypeProjects = {
    // id: number,
    name: string;
    icon: string;
};

export type ApiProps = {
    id: number;
    name: string;
    icon: string;
    description: string;
    email: string;
    phone: string;
    team: Array<TypeTeam>;
    projects: Array<TypeProjects>;
};

interface Props {
    baseURL: string;
    department: ApiProps;
}

export default Props;
