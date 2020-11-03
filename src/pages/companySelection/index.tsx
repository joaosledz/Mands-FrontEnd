import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { companyApi, CompanyType } from '../../services';

import AppLayout from '../../layout/appLayout';
import EmptyCompanies from './emptyCompanies';
import Companies from './companySelection/companySelection';
import FabButton from '../../components/fabButton';

const CompanySelection: React.FC = () => {
    const [companies, setCompanies] = useState<Array<CompanyType>>();
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        document.title = 'Seleção de Empresa';
        const getUserCompanies = async () => {
            try {
                const response = await companyApi.userCompanies();
                setCompanies(response.data);
                setLoading(false);
            } catch (error) {
                // alerta de erro
                setLoading(false);
            }
        };
        getUserCompanies();
    }, []);

    return (
        <AppLayout>
            {loading ? (
                <h1>Carregando</h1>
            ) : companies ? (
                <Companies companies={companies} />
            ) : (
                <EmptyCompanies />
            )}
            <FabButton onClick={() => history.push('/cadastrar-empresa')} />
        </AppLayout>
    );
};

export default CompanySelection;
