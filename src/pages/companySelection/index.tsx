import React from 'react';

import AppLayout from '../../layout/appLayout';
import EmptyCompanies from './components/emptyCompanies';
import Companies from './components/companySelection';
import FabButton from '../../components/fabButton';

import companies from '../../utils/data/companies';

const CompanySelection: React.FC = () => {
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
