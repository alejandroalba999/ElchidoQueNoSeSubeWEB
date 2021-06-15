import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Login } from '../components/authentication/Login';
import { RecoverPassword } from '../components/authentication/RecoverPassword';

export const AuthRouter = () => {
    return (
        <div>
            <Switch >

                <Route exact path="/auth/login" component={Login} />

                <Route exact path="/auth/recoveryPassword" component={RecoverPassword} />

                <Redirect to="/auth/login" />

            </Switch >
        </div>
    )
}

