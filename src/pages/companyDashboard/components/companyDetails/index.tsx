import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { CompanyType } from '../../../../services';

import Header from './components/header';
import CompanyData from './components/companyDataContainer';
import useStyles from './styles';

type Props = {
    data: CompanyType;
};

const CompanyDetails: React.FC<Props> = ({ data }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.container}>
            <Header company={data} />
            <Divider variant="middle" className={classes.divider} />
            <CompanyData data={data} />
        </Paper>
    );
};

export default CompanyDetails;
