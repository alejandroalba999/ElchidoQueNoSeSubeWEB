import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { CajonesLibres } from '../components/dashboard/CajonesLibres'
import { GestCajones } from '../components/cajones/GestCajones';
import { GestUsuarios } from '../components/usuarios/GestUsuarios';
import { GestVehicular } from '../components/vehiculos/GestVehicular';
import { AuthRouter } from '../router/AuthRouter'
import ProtectedRoute from './ProtectedRoute';


export const AppRouter = () => {

    return (

        <Router>
            <div>
                <Switch>

                    <Route path="/auth" component={AuthRouter} />

                    <ProtectedRoute exact path='/dashboard' component={CajonesLibres} role={false} />



                    <ProtectedRoute exact path='/gestionVehicular' component={GestVehicular} role={false} />



                    <ProtectedRoute exact path='/gestionUsuarios' component={GestUsuarios} role={true} />


                    <ProtectedRoute exact path='/gestionCajones' component={GestCajones} role={true} />


                    <ProtectedRoute exact path='/rentar/:_id' component={GestCajones} role={false} />


                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
