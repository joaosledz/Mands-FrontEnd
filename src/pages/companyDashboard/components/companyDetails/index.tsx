import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import TypeCompany from '../../../../models/company';

import Header from './components/header';
import CompanyData from './components/companyDataContainer';
import useStyles from './styles';

type Props = {
    companies: Array<TypeCompany>;
    data: TypeCompany;
};

const CompanyDetails: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { companies, data } = props;
    return (
        <Paper className={classes.container}>
            <Header companies={companies} />
            <Divider variant="middle" className={classes.divider} />
            <CompanyData data={data} />
        </Paper>
    );
};

export default CompanyDetails;
