import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

//#region AdminDashboard
import DepartmentsAdminDashboard from '../pages/adminDashboard/departments';
//#endregion

const AdministratorRoutes = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route
                path={`${path}/departamentos`}
                component={DepartmentsAdminDashboard}
            />
            <Redirect exact from={`${path}`} to={`${path}/departamentos`} />
        </Switch>
    );
};

export default AdministratorRoutes;
