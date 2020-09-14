import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

import AppLayout from '../../layout/appLayout';
import EmptyCompanies from './components/emptyCompanies';
import Companies from './components/companySelection';
// import { Container } from './styles';

const CompanySelection: React.FC = () => {
    const [companies] = useState<Array<{ name: string }> | null>([
        { name: 'IT - Inteligência e Tecnologia' },
        { name: 'Facebook' },
        { name: 'Google' },
        { name: 'Seu Zé' },
    ]);

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
