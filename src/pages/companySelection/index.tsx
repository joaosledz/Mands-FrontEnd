import React, { useState } from 'react';

import AppLayout from '../../layout/appLayout';
import EmptyCompanies from './components/emptyCompanies';
import Companies from './components/companySelection';
import FabButton from '../../components/fabButton';

import companiesData from '../../utils/data/companies';

const CompanySelection: React.FC = () => {
    const [companies] = useState(companiesData);

    return (
        <AppLayout>
            {companies ? (
                <Companies companies={companies} />
            ) : (
                <EmptyCompanies />
            )}
            <FabButton />
        </AppLayout>
    );
};

export default CompanySelection;
