import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// import PrivateRoute from './privateRoute';

//#region Rotas de autenticação
import Login from '../pages/authentication/login';
import Register from '../pages/authentication/register';
import ForgotPassword from '../pages/authentication/forgotPassword';
//#endregion

//#region Rotas da aplicação
import CompanySelection from '../pages/companySelection';
import CompanyDashboard from '../pages/companyDashboard';
//#endregion

//#region AdminDashboard
import DepartmentsAdminDashboard from '../pages/adminDashboard/departments';
//#endregion

const Routes = () => {
    const browserHistory = createBrowserHistory();

    return (
        <Router history={browserHistory}>
            <Switch>
                {/* Transformar as rotas abaixo em PublicRoutes */}
                {/* Rotas de Autenticação */}
                <Route path="/" component={Login} exact />
                <Route path="/criar-conta" component={Register} />
                <Route path="/esqueci-a-senha" component={ForgotPassword} />
                {/* Transformar as rotas abaixo em PrivateRoute */}
                <Route
                    path="/escolha-da-empresa"
                    component={CompanySelection}
                />
                <Route
                    path="/dashboard/:companyName"
                    component={CompanyDashboard}
                />
                {/* Rotas do Administrador */}
                <Route
                    path="/administrador/departamentos"
                    component={DepartmentsAdminDashboard}
                />
            </Switch>
            {/* <PrivateRoute path="/escolha-empresa" component={CompanySelection} /> */}
            {/* <PrivateRoute path="/user" component={User} /> */}
        </Router>
    );
};

export default Routes;
