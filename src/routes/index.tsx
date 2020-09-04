import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PrivateRoute from './privateRoute';

import Login from '../pages/login';
import ForgotPassword from '../pages/forgotPassword';
import Test from '../pages/testCalendar/test.jsx';

const Routes = () => {
    const browserHistory = createBrowserHistory();

    return (
        <Router history={browserHistory}>
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/esqueci-a-senha" component={ForgotPassword} />
                <Route path="/teste" component={Test} />
                {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
                {/* <PrivateRoute path="/user" component={User} /> */}
            </Switch>
        </Router>
    );
};

export default Routes;
