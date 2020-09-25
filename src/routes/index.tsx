import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// import PrivateRoute from './privateRoute';

//#region Rotas de autenticação
import Login from '../pages/authentication/login';
import Register from '../pages/authentication/register';
import ForgotPassword from '../pages/authentication/forgotPassword';
//#endregion

//#region Rotas da aplicação
import CompanySelection from '../pages/companySelection';
import Dashboard from '../pages/companyDashboard';
//#endregion

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/criar-conta" component={Register} />
                <Route path="/esqueci-a-senha" component={ForgotPassword} />
                {/* Transformar as rotas abaixo em PrivateRoute */}
                <Route
                    path="/escolha-da-empresa"
                    component={CompanySelection}
                />
                <Route path="/dashboard/:companyName" component={Dashboard} />
                {/* <PrivateRoute path="/escolha-empresa" component={CompanySelection} /> */}
                {/* <PrivateRoute path="/user" component={User} /> */}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
