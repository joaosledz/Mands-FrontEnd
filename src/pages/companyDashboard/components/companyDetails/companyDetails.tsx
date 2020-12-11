import React from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { UserCompanyType } from '../../../../services';

import Header from './header/header';
import CompanyDataItem from '../../../../components/dataTextGridItem';
import useStyles from './styles';
import FabButton from '../../../../components/fabButton';

type Props = {
    data: UserCompanyType;
};

const CompanyDetails: React.FC<Props> = ({ data }) => {
    const classes = useStyles();
    const history = useHistory();
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
            <FabButton
                title="Editar"
                icon="edit"
                style={classes.fabButton}
                onClick={() => history.replace(`/${username}/editar-empresa`)}
            />
        </Paper>
    );
};

export default CompanyDetails;
