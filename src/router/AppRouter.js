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
import { Navbar } from '../components/shared/Navbar'
import { AuthRouter } from '../router/AuthRouter'

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/auth" component={AuthRouter} />

                    <Route exact path='/dashboard' >
                        <Navbar />
                        <div className="container">
                            <CajonesLibres />
                        </div>
                    </Route>

                    <Route exact path='/gestionVehicular' >
                        <Navbar />
                        <div className="container">
                            <GestVehicular />
                        </div>
                    </Route>

                    <Route exact path='/gestionUsuarios' >
                        <Navbar />
                        <div className="container">
                            <GestUsuarios />
                        </div>
                    </Route>

                    <Route exact path='/gestionCajones' >
                        <Navbar />
                        <div className="container">
                            <GestCajones />
                        </div>
                    </Route>

                    <Route exact path='/rentar/:_id' >
                        <Navbar />
                        <div className="container">
                            <GestCajones />
                        </div>
                    </Route>

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
