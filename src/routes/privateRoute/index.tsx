import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

interface PrivateRouteProps {
    component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component } = props;
    const { signed, loading } = useAuth();

    // if (loading) {
    //     return <SomeSpinner />
    // }

    return (
        <Route
            {...props}
            render={() =>
                signed ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    );
};

export default PrivateRoute;
