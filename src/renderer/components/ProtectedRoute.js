import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../../renderer/components/services/auth';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render= {props => {
            if(auth.isAuthentificated()){
                return <Component {...props} />
            }else{
                return <Redirect to={
                    {
                        pathname: "/licence",
                        state: {
                            from: props.location
                        }
                    }
                } 
                />
            }
        }}
        />
    )
}

export default ProtectedRoute;