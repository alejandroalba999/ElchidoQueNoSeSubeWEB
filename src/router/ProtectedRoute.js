import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar"

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = localStorage.getItem("authorization");

    console.log(restOfProps)
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