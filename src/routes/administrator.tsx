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
                path={`${path}/:company/departamentos`}
                component={Departments}
            />
            <Route
                path={`${path}/:company/departamentos/cadastrar`}
                component={RegisterDepartment}
            />
            <Route
                path={`${path}/:company/departamentos/detalhes/:name`}
                component={DepartmentDetails}
            />
            <Redirect
                exact
                from={`${path}/:company`}
                to={`${path}/:company/departamentos`}
            />
            <Redirect
                exact
                from={`${path}/:company/departamentos/detalhes`}
                to={`${path}/:company/departamentos`}
            />
            <Redirect
                exact
                from={`${path}`}
                to={`${path}/:company/departamentos`}
            />
        </Switch>
    );
};

export default AdministratorRoutes;
