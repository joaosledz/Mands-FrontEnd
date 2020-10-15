import React from 'react';
import Grid from '@material-ui/core/Grid';

import { ApiProps as DepartmentType } from '../../../../models/department';

import DepartmentDataItem from '../../../../components/dataTextGridItem';
// import useStyles from './styles';

type Props = {
    department: DepartmentType | undefined;
};

const DepartmentDataContainer: React.FC<Props> = ({ department }) => {
    // const classes = useStyles();
    return (
        <Grid container spacing={2}>
            {/* <DepartmentDataItem title="Gerente" data={department.} /> */}
            <DepartmentDataItem
                title="Descrição"
                data={department?.description}
            />
            <DepartmentDataItem title="Email" data={department?.email} />
            {/* <DepartmentDataItem title="Telefone" data={department.phone} /> */}
        </Grid>
    );
};

export default DepartmentDataContainer;
