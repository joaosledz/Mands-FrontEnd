import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { ApiProps as DepartmentType } from '../../../models/department';
// import useCompany from '../../../hooks/useCompany';

import Header from './header/header';
import DepartmentData from './departmentDataContainer/departmentDataContainer';
import useStyles from './styles';

type Props = {
    department: DepartmentType | undefined;
    departments: Array<DepartmentType>;
};

const CompanyDetails: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { department, departments } = props;

    // const company: CompanyType = useCompany();

    return (
        <Paper className={classes.container}>
            <Header department={department} departments={departments} />
            <Divider variant="middle" className={classes.divider} />
            <DepartmentData department={department} />
        </Paper>
    );
};

export default CompanyDetails;
