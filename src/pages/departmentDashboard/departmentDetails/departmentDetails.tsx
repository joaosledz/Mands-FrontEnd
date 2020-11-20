import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { TypeDepartment } from '../../../services';
import DepartmentDataItem from '../../../components/dataTextGridItem';

import Header from './header/header';
import useStyles from './styles';

type Props = {
    department: TypeDepartment;
};

const CompanyDetails: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { department } = props;

    // const company: UserCompanyType = useCompany();

    return (
        <Paper className={classes.container}>
            <Header department={department} />
            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={2}>
                <DepartmentDataItem
                    title="Descrição"
                    data={department.objective}
                />
                <DepartmentDataItem title="Email" data={department.email} />
                <DepartmentDataItem title="Telefone" data={department.phone} />
            </Grid>
        </Paper>
    );
};

export default CompanyDetails;
