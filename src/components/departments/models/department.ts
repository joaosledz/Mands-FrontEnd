export type ApiProps = {
    id: number;
    name: string;
    icon: string;
    description: string;
    email: string;
    phone: string;
};

interface Props {
    baseURL: string;
    department: ApiProps;
}

export default Props;
