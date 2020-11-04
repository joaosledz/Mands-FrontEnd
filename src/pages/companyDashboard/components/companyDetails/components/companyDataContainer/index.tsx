import React from 'react';
import Grid from '@material-ui/core/Grid';

import { CompanyType } from '../../../../../../services';

import CompanyDataItem from '../../../../../../components/dataTextGridItem';
// import useStyles from './styles';

type Props = {
    data: CompanyType;
};

const CompanyDataContainer: React.FC<Props> = ({ data }) => {
    // const classes = useStyles();
    const { username, cnpj, email, phone } = data!;
    return (
        <Grid container spacing={2}>
            {/* <CompanyDataItem title="Presidente" data={data.president} /> */}
            <CompanyDataItem title="Usuário" data={username} />
            {cnpj && <CompanyDataItem title="CNPJ" data={cnpj} />}
            <CompanyDataItem title="Email" data={email} />
            <CompanyDataItem title="Telefone" data={phone} />
        </Grid>
    );
};

export default CompanyDataContainer;
