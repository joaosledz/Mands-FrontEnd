import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Departments from '../pages/adminDashboard/departments';
import RegisterDepartment from '../pages/adminDashboard/departments/newDepartment';
import DepartmentDetails from '../pages/adminDashboard/departments/department/details';

const AdministratorRoutes = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route
                exact
                path={`${path}/departamentos`}
                component={Departments}
            />
            <Route
                path={`${path}/departamentos/cadastrar`}
                component={RegisterDepartment}
            />
            <Route
                path={`${path}/departamentos/detalhes/:name`}
                component={DepartmentDetails}
            />
            <Redirect
                exact
                from={`${path}/departamentos/detalhes`}
                to={`${path}/departamentos`}
            />
            <Redirect exact from={`${path}`} to={`${path}/departamentos`} />
        </Switch>
    );
};

export default AdministratorRoutes;
