import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { UserCompanyType } from '../../../../services';
import Header from './header/header';
import CompanyDataItem from '../../../../components/dataTextGridItem';
import useStyles from './styles';

type Props = {
    data: UserCompanyType;
};

const CompanyDetails: React.FC<Props> = ({ data }) => {
    const classes = useStyles();
    const { username, cnpj, email, phone } = data;

    return (
        <Paper className={classes.container}>
            <Header company={data} />
            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={2}>
                {/* <CompanyDataItem title="Presidente" data={data.president} /> */}
                <CompanyDataItem title="Usuário" data={username} />
                {cnpj && <CompanyDataItem title="CNPJ" data={cnpj} />}
                <CompanyDataItem title="Email" data={email} />
                <CompanyDataItem title="Telefone" data={phone} />
            </Grid>
        </Paper>
    );
};

export default CompanyDetails;
