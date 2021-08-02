import React from 'react'
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
import { GestControlPago } from '../components/controlPago/GestControlPago';
import { AuthRouter } from '../router/AuthRouter'
import ProtectedRoute from './ProtectedRoute';
import { Perfil } from '../components/account/Perfil';




export const AppRouter = () => {

    return (

        <Router>
            <div>
                <Switch>

                    <Route path="/auth" component={AuthRouter} />

                    <ProtectedRoute exact path='/dashboard' component={CajonesLibres} role={null} />

                    <ProtectedRoute exact path='/account/perfil' component={Perfil} role={null} />


                    <ProtectedRoute exact path='/gestionVehicular' component={GestVehicular} role={true} />

                    <ProtectedRoute exact path='/rentar/:_id' component={GestVehicular} role={true} />

                    <ProtectedRoute exact path='/image' component={Image} role={null} />

                    <ProtectedRoute exact path='/gestionUsuarios' component={GestUsuarios} role={true} />


                    <ProtectedRoute exact path='/gestionCajones' component={GestCajones} role={true} />


                    <ProtectedRoute exact path='/rentarme' component={GestControlPago} role={true} />


                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
