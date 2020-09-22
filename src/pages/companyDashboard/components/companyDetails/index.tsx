import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { ICompany } from './models/ICompany';
// import DevIcon from '../../../../assets/selectableIcons/webPrograming.svg';
import Header from './components/header';
import CompanyData from './components/companyDataContainer';
import useStyles from './styles';

interface DepartmentsProps {
    containerStyles?: string;
}

const data = {
    id: 1,
    name: 'IT - Inteligência e Tecnologia',
    president: 'Guto Sobrenome',
    cnpj: '82.739.380/0001-45',
    email: 'contato@inteligencia&tecnologia.com.br',
    telephone: '(71) 99951-4381',
};

const companies = [
    { ...data },
    {
        id: 2,
        name: 'Facebook',
        president: 'Mark Zuckeberg',
        cnpj: '82.739.380/0001-45',
        email: 'support@facebook.com',
        telephone: '',
    },
];

const CompanyDetails: React.FC<DepartmentsProps> = ({ containerStyles }) => {
    const classes = useStyles();
    const [company] = useState<ICompany>(data);
    return (
        <Paper className={classes.container}>
            <Header companies={companies} />
            <Divider variant="middle" className={classes.divider} />
            <CompanyData data={company} />
        </Paper>
    );
};

export default CompanyDetails;
