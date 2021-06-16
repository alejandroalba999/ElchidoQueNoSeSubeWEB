import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar"
import jwt_decode from "jwt-decode";




function ProtectedRoute({ component: Component, role, ...restOfProps }) {
    const isAuthenticated = localStorage.getItem("authorization");
    const decoded = jwt_decode(localStorage.getItem('authorization'));
    console.log(decoded.usuario.blnAdmin, role);


    return (
        <>
            <Navbar />
            <div className="container">
                <Route
                    {...restOfProps}
                    render={(props) =>
                        isAuthenticated ? <Component {...props} /> : <Redirect to="/auth/login" />
                    }
                />
            </div>
        </>

    );
}

export default ProtectedRoute;