import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AppLayout from '../../layout/appLayout';
import EmptyCompanies from './components/emptyCompanies';
import Companies from './companySelection/companySelection';
import FabButton from '../../components/fabButton';

import companiesData from '../../utils/data/companies';

const CompanySelection: React.FC = () => {
    const [companies] = useState(companiesData);
    const history = useHistory();

    useEffect(() => {
        document.title = 'Seleção de Empresa';
    }, []);

    return (
        <AppLayout>
            {companies ? (
                <Companies companies={companies} />
            ) : (
                <EmptyCompanies />
            )}
            <FabButton onClick={() => history.push('/cadastrar-empresa')} />
        </AppLayout>
    );
};

export default CompanySelection;
