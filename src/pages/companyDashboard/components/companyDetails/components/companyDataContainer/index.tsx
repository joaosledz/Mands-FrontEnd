import React from 'react';
import Grid from '@material-ui/core/Grid';

import { ICompany } from '../../models/ICompany';

import CompanyDataItem from './components/companyDataItem';
// import useStyles from './styles';

interface ICompanyDataContainer {
    data: ICompany;
}

const CompanyDataContainer: React.FC<ICompanyDataContainer> = ({ data }) => {
    // const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <CompanyDataItem title="Presidente" data={data.president} />
            <CompanyDataItem title="CNPJ" data={data.cnpj} />
            <CompanyDataItem title="Email" data={data.email} />
            <CompanyDataItem title="Telefone" data={data.telephone} />
        </Grid>
    );
};

export default CompanyDataContainer;
