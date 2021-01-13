import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { companyApi, UserCompanyType } from '../../../services';

import AppLayout from '../../../layout/appLayout';
import EmptyCompanies from './emptyCompanies';
import Companies from './companySelection/selection';
import FabButton from '../../../components/fabButton';
import snackbarUtils from '../../../utils/functions/snackbarUtils';

const CompanySelection: React.FC = () => {
    const [companies, setCompanies] = useState<Array<UserCompanyType>>([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        document.title = 'Seleção de Empresa';
        const getUserCompanies = async () => {
            setLoading(true);
            try {
                const response = await companyApi.userCompanies();
                setCompanies(response.data);
            } catch (error) {
                snackbarUtils.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getUserCompanies();
    }, []);

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
