import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';

import { ICompany } from './models/ICompany';
// import DevIcon from '../../../../assets/selectableIcons/webPrograming.svg';
import CompanyData from './components/companyDataContainer';
import useStyles from './styles';

interface DepartmentsProps {
    containerStyles?: string;
}

const data = {
    president: 'Guto Sobrenome',
    cnpj: '82.739.380/0001-45',
    email: 'contato@inteligencia&tecnologia.com.br',
    telephone: '(71) 99951-4381',
};

const CompanyDetails: React.FC<DepartmentsProps> = ({ containerStyles }) => {
    const classes = useStyles();
    const [company] = useState<ICompany>(data);
    return (
        <Paper className={classes.container}>
            <CompanyData data={company} />
        </Paper>
    );
};

export default CompanyDetails;
