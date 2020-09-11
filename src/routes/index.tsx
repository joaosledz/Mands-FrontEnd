import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// import PrivateRoute from './privateRoute';

//#region Rotas de autenticação
import Login from '../pages/authentication/login';
import Register from '../pages/authentication/register';
import ForgotPassword from '../pages/authentication/forgotPassword';
//#endregion

import CompanySelection from '../layout/appLayout';

const Routes = () => {
    const browserHistory = createBrowserHistory();

    return (
        <Router history={browserHistory}>
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/criar-conta" component={Register} />
                <Route path="/esqueci-a-senha" component={ForgotPassword} />
                {/* Transformar as rotas abaixo em PrivateRoute */}
                <Route
                    path="/escolha-da-empresa"
                    component={CompanySelection}
                />
                {/* <PrivateRoute path="/escolha-empresa" component={CompanySelection} /> */}
                {/* <PrivateRoute path="/user" component={User} /> */}
            </Switch>
        </Router>
    );
};

export default Routes;
