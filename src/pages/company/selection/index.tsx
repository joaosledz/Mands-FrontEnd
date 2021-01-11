import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { companyApi, UserCompanyType } from '../../../services';

import AppLayout from '../../../layout/appLayout';
import EmptyCompanies from './emptyCompanies';
import Companies from './companySelection/selection';
import FabButton from '../../../components/fabButton';

const CompanySelection: React.FC = () => {
    const [companies, setCompanies] = useState<Array<UserCompanyType>>([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        document.title = 'Seleção de Empresa';
        const getUserCompanies = async () => {
            try {
                setLoading(true);
                const response = await companyApi.userCompanies();
                setCompanies(response.data);
                setLoading(false);
            } catch (error) {
                // alerta de erro
                setLoading(false);
            }
        };
        if (companies.length === 0) getUserCompanies();
    }, [companies.length]);

    return (
        <AppLayout loading={loading}>
            {companies.length !== 0 ? (
                <Companies companies={companies} />
            ) : (
                <EmptyCompanies />
            )}
            <FabButton onClick={() => history.push('/cadastrar-empresa')} />
        </AppLayout>
    );
};

export default CompanySelection;
