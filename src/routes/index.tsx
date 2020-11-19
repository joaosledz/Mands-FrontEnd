import React from 'react';
import { Switch, Redirect, BrowserRouter } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import PublicRoute from './components/publicRoute';
import PrivateRoute from './components/privateRoute';

//#region Rotas de autenticação
import Login from '../pages/authentication/login/login';
import Register from '../pages/authentication/register/register';
import ForgotPassword from '../pages/authentication/RecoverPassword/forgotPassword/forgotPassword';
import RecoveryPassword from '../pages/authentication/RecoverPassword/recoveryPassword/recoveryPassword';
//#endregion

//#region Rotas da aplicação
import UserProfile from '../pages/userProfile/details/details';
import UserProfileEdit from '../pages/userProfile/edit';
import CompanySelection from '../pages/companySelection';
import CompanyRegister from '../pages/companyRegister/company.register';
import CompanyDashboard from '../pages/companyDashboard/companyDashboard';
import DepartmentDashboard from '../pages/departmentDashboard/departmentDashboard';
import Boards from '../pages/boards';
//#endregion

//#region AdminDashboard
import AdministratorRoutes from './administrator.routes';
//#endregion

const Routes = () => {
    const { loading, signed } = useAuth();

    // console.log('loading: ', loading, 'signed: ', signed);
    if (loading) return <h1>Carregando...</h1>;

    return (
        <BrowserRouter>
            <Switch>
                {/* Rotas de Autenticação */}
                <PublicRoute path="/login" component={Login} exact />
                <PublicRoute path="/cadastro" component={Register} />
                <PublicRoute
                    path="/esqueci-a-senha"
                    component={ForgotPassword}
                />
                <PublicRoute
                    path="/recuperar-senha/:token"
                    component={RecoveryPassword}
                />
                {/* Rotas da Aplicação */}
                <PrivateRoute path="/perfil" component={UserProfile} />
                <PrivateRoute
                    path="/editar-perfil"
                    component={UserProfileEdit}
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
                    path="/dashboard/:companyName"
                    component={CompanyDashboard}
                />
                <PrivateRoute
                    exact
                    path="/:companyName/:departmentName"
                    component={DepartmentDashboard}
                />
                <PrivateRoute path="/quadros" component={Boards} />
                {/* Rotas do Administrador */}
                <PrivateRoute path="/admin" component={AdministratorRoutes} />
                {signed ? (
                    <Redirect exact from="*" to="/login" />
                ) : (
                    <Redirect exact from="*" to="/escolha-da-empresa" />
                )}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
