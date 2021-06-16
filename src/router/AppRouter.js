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
import { Navbar } from '../components/shared/Navbar'
import { AuthRouter } from '../router/AuthRouter'
import ProtectedRoute from './ProtectedRoute';


export const AppRouter = () => {

    return (

        <Router>
            <div>
                <Switch>

                    <Route path="/auth" component={AuthRouter} />

                    <ProtectedRoute exact path='/dashboard' component={CajonesLibres} />



                    <ProtectedRoute exact path='/gestionVehicular' component={GestVehicular} />



                    <ProtectedRoute exact path='/gestionUsuarios' component={GestUsuarios} />


                    <ProtectedRoute exact path='/gestionCajones' component={GestCajones} />


                    <ProtectedRoute exact path='/rentar/:_id' component={GestCajones} />


                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
