import React from 'react';
import { Switch, Redirect, BrowserRouter, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import PublicRoute from './components/publicRoute';
import PrivateRoute from './components/privateRoute';
import Loading from '../components/loading/loading';
import NotFound from '../pages/404';

//#region Rotas de autenticação
import Login from '../pages/authentication/login/login';
import Register from '../pages/authentication/register/register';
import RegisterGoogle from '../pages/authentication/registerGoogle';
import ConfirmAccount from '../pages/authentication/confirmAccount/confirmAccount';
import ForgotPassword from '../pages/authentication/RecoverPassword/forgotPassword/forgotPassword';
import RecoveryPassword from '../pages/authentication/RecoverPassword/recoveryPassword/recoveryPassword';
//#endregion

//#region Rotas da aplicação
import UserProfile from '../pages/profiles/user/details/details';
import UserProfileEdit from '../pages/profiles/user/edit';
import OtherProfile from '../pages/profiles/other/other';
import CompanySelection from '../pages/company/selection';
import CompanyRegister from '../pages/company/register/register';
import CompanyDashboard from '../pages/company/dashboard/dashboard';
import DepartmentDashboard from '../pages/departmentDashboard/departmentDashboard';
import Boards from '../pages/boards';
//#endregion

//#region AdminDashboard
import AdministratorRoutes from './administrator.routes';
//#endregion

import linkedInPopUp from '../utils/functions/linkedinPopUp';

const Routes = () => {
    const { loading, signed } = useAuth();

    // console.log('loading: ', loading, 'signed: ', signed);
    if (loading) return <Loading type="whole" />;

    return (
        <BrowserRouter>
            <Switch>
                {signed ? (
                    <Redirect exact from="/" to="/login" />
                ) : (
                    <Redirect exact from="/" to="/escolha-da-empresa" />
                )}
                {/* Rotas de Autenticação */}
                <PublicRoute path="/linkedin" component={linkedInPopUp} exact />
                <PublicRoute path="/login" component={Login} exact />
                <PublicRoute path="/cadastro" component={Register} />
                <PublicRoute
                    path="/cadastro-google"
                    component={RegisterGoogle}
                />
                <PublicRoute
                    path="/esqueci-a-senha"
                    component={ForgotPassword}
                />
                <PublicRoute
                    path="/confirmar-conta"
                    component={ConfirmAccount}
                />
                <PublicRoute
                    path="/recuperar-senha/:token"
                    component={RecoveryPassword}
                />
                {/* Rotas da Aplicação */}
                <PrivateRoute path="/perfil" exact component={UserProfile} />
                <PrivateRoute
                    path="/editar-perfil"
                    component={UserProfileEdit}
                />
                <PrivateRoute
                    path="/perfil/:username"
                    component={OtherProfile}
                />
                <PrivateRoute
                    path="/escolha-da-empresa"
                    component={CompanySelection}
                />
                <PrivateRoute
                    path="/cadastrar-empresa"
                    component={CompanyRegister}
                />
                <PrivateRoute
                    path="/dashboard/:company"
                    component={CompanyDashboard}
                />
                <PrivateRoute
                    exact
                    path="/:company/:department"
                    component={DepartmentDashboard}
                />
                <PrivateRoute
                    path="/:company/:department/quadro/:project"
                    component={Boards}
                />
                {/* Rotas do Administrador */}
                <PrivateRoute path="/admin" component={AdministratorRoutes} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
