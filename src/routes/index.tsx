import React from 'react';
import { Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import PublicRoute from './components/publicRoute';
import PrivateRoute from './components/privateRoute';

//#region Rotas de autenticação
import Login from '../pages/authentication/login/login';
import Register from '../pages/authentication/register/register';
import ForgotPassword from '../pages/authentication/forgotPassword/forgotPassword';
import RecoveryPassword from '../pages/authentication/recoveryPassword/recoveryPassword';
//#endregion

//#region Rotas da aplicação
import CompanySelection from '../pages/companySelection';
import UserProfile from '../pages/userProfile/main';
import UserProfileEdit from '../pages/userProfile/edit';
import CompanyDashboard from '../pages/companyDashboard';
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
                <PublicRoute path="/criar-conta" component={Register} />
                <PublicRoute
                    path="/esqueci-a-senha"
                    component={ForgotPassword}
                />
                <PublicRoute
                    path="/recuperar-senha/:token"
                    component={RecoveryPassword}
                />
                {/* Rotas da Aplicação */}
                <PrivateRoute
                    path="/escolha-da-empresa"
                    component={CompanySelection}
                />
                <PrivateRoute path="/perfil" component={UserProfile} />
                <PrivateRoute
                    path="/editar-perfil"
                    component={UserProfileEdit}
                />
                <PrivateRoute
                    path="/dashboard/:companyName"
                    component={CompanyDashboard}
                />
                <PrivateRoute
                    path="/:companyName/departamento/:departmentName"
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
