import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface Props extends RouteProps {
    component: any;
}
const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    const { signed } = useAuth();
    return (
        <Route
            {...rest}
            render={routeProps =>
                signed ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
