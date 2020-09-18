import React, { useState } from 'react';

import AppLayout from '../../layout/appLayout';
import EmptyCompanies from './components/emptyCompanies';
import Companies from './components/companySelection';
// import { Container } from './styles';

const data = [
    { name: 'IT - Inteligência e Tecnologia' },
    { name: 'Facebook' },
    { name: 'Google' },
    { name: 'Seu Zé' },
];

const CompanySelection: React.FC = () => {
    const [companies] = useState<Array<{ name: string }> | null>(data);

    return (
        <AppLayout>
            {companies ? (
                <Companies companies={companies} />
            ) : (
                <EmptyCompanies />
            )}
        </AppLayout>
    );
};

export default CompanySelection;
