import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// import PrivateRoute from './privateRoute';

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
import AdministratorRoutes from './administrator';
//#endregion

const Routes = () => (
    <BrowserRouter>
        <Switch>
            {/* Transformar as rotas abaixo em PublicRoutes */}
            {/* Rotas de Autenticação */}
            <Route path="/" component={Login} exact />
            <Route path="/criar-conta" component={Register} />
            <Route path="/esqueci-a-senha" component={ForgotPassword} />
            <Route
                path="/recuperar-senha/:token"
                component={RecoveryPassword}
            />
            {/* Transformar as rotas abaixo em PrivateRoute */}
            <Route path="/perfil" component={UserProfile} />
            <Route path="/editar-perfil" component={UserProfileEdit} />
            <Route path="/escolha-da-empresa" component={CompanySelection} />
            <Route
                path="/dashboard/:companyName"
                component={CompanyDashboard}
            />
            <Route
                path="/:companyName/departamento/:departmentName"
                component={DepartmentDashboard}
            />
            <Route path="/quadros" component={Boards} />
            {/* Rotas do Administrador */}
            <Route path="/admin" component={AdministratorRoutes} />
        </Switch>
        {/* <PrivateRoute path="/escolha-empresa" component={CompanySelection} /> */}
        {/* <PrivateRoute path="/user" component={User} /> */}
    </BrowserRouter>
);

export default Routes;
