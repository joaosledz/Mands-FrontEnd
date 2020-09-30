import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Departments from '../pages/adminDashboard/departments';
import RegisterDepartment from '../pages/adminDashboard/departments/newDepartment';

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
            <Redirect exact from={`${path}`} to={`${path}/departamentos`} />
        </Switch>
    );
};

export default AdministratorRoutes;
