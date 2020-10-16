import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Departments from '../pages/adminDashboard/departments';
import RegisterDepartment from '../pages/adminDashboard/departments/department/register/register';
import DepartmentDetails from '../pages/adminDashboard/departments/department/details';
import DepartmentEdit from '../pages/adminDashboard/departments/department/edit';

import RegisterProject from '../pages/adminDashboard/departments/projects/register/register';
import ProjectDetails from '../pages/adminDashboard/departments/projects/details/details';
import ProjectEdit from '../pages/adminDashboard/departments/projects/edit/edit';

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
                path={`${path}/:company/departamentos/:department/detalhes`}
                component={DepartmentDetails}
            />
            <Route
                path={`${path}/:company/departamentos/:department/edicao`}
                component={DepartmentEdit}
            />

            {/* Rotas de Projeto */}
            <Route
                path={`${path}/:company/departamentos/:department/projeto/cadastrar`}
                component={RegisterProject}
            />
            <Route
                path={`${path}/:company/departamentos/:department/projeto/:project/detalhes`}
                component={ProjectDetails}
            />
            <Route
                path={`${path}/:company/departamentos/:department/projeto/:project/edicao`}
                component={ProjectEdit}
            />

            {/* Redirecionamentos */}
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
