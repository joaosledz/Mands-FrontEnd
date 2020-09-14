import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

import AppLayout from '../../layout/appLayout';
import EmptyCompanies from './components/emptyCompanies';
// import { Container } from './styles';

const CompanySelection: React.FC = () => {
    const [companies, setCompanies] = useState<object[] | null>(null);

    return <AppLayout>{!companies ? <EmptyCompanies /> : <></>}</AppLayout>;
};

export default CompanySelection;
