import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

interface Props extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
}

const PublicRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    const { signed } = useAuth();
    return (
        <Route
            {...rest}
            render={routeProps =>
                signed ? (
                    <Redirect to="/escolha-da-empresa" />
                ) : (
                    <Component {...routeProps} />
                )
            }
        />
    );
};

export default PublicRoute;
