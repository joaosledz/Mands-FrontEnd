import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import DepartmentAllProps, {
    ApiProps as DepartmentType,
} from '../../models/department';
import DepartmentsData from '../../utils/data/departments';

import AppLayout from '../../layout/appLayout';
import Header from './header/header';
import DepartmentDetails from './departmentDetails/departmentDetails';
import Projects from './projects/projects';
import useStyles from './styles';

type LocationProps = {
    props: DepartmentAllProps;
};
const DepartmentDashboard: React.FC = () => {
    const classes = useStyles();
    const location = useLocation<LocationProps>();
    const history = useHistory();
    // const [company] = useState<UserCompanyType>(useCompany());
    const [department, setDepartment] = useState<DepartmentType>();

    useEffect(() => {
        const handleLocationData = () => {
            if (location.state) {
                const department = location.state.props.department;
                document.title = `Departamento - ${department.name}`;
                setDepartment(department);
            } else {
                history.push('/escolha-da-empresa');
            }
        };
        handleLocationData();
    }, [history, location.state]);

    return (
        <AppLayout /*layoutStyles={classes.layout}*/>
            {/* Dinamico */}
            <Box className={classes.container}>
                <Header jobTitle="Gerente" />
                <Grid
                    container
                    spacing={3}
                    className={classes.contentContainer}
                >
                    <Grid item xs={12} md={6}>
                        <Projects projects={department?.projects} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DepartmentDetails
                            department={department}
                            departments={DepartmentsData}
                        />
                    </Grid>
                </Grid>
            </Box>
        </AppLayout>
    );
};

export default DepartmentDashboard;
