import React from 'react'
import caleo_logo from '../../assets/images/caleo_logo.png'
import {
    Link
} from "react-router-dom";

export const Navbar = () => {

    return (
        <div style={{ borderBottom: '3px solid #d1d1d1' }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid" style={{ marginRight: '50px' }}>
                    <Link className="navbar-brand" to='/dashboard'><img src={caleo_logo} alt="Caleo" style={{ maxWidth: '130px' }} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item m-1 active">
                                <Link className="nav-link active" aria-current="page" to='/dashboard'> <i className="fa fa-home m-1"></i> Inicio</Link>
                            </li>
                            <li className="nav-item m-1">
                                <Link className="nav-link" to='/gestionVehicular' > <i className="fa fa-car m-1"></i>Gestión Vehicular</Link>
                            </li>
                            <li className="nav-item m-1">
                                <Link className="nav-link" to='/gestionUsuarios'> <i className="fa fa-user m-1"></i>Gestión de Usuarios</Link>
                            </li>
                            <li className="nav-item m-1">
                                <Link className="nav-link" to='/gestionCajones' > <i className="fa fa-th m-1"></i>Gestión de Cajones</Link>
                            </li>
                            <li className="nav-item m-1" id=" dropdownMenuButton" data-toggle="dropdown">

                                <a className="nav-link" style={{ cursor: 'pointer' }}> <i className="fa fa-user m-1"></i>Mi cuenta</a>

                                <div className="dropdown-menu dropleft" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" >Mi cuenta</a>
                                    <a className="dropdown-item" >Cerrar Sesión</a>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>


            </nav>

        </div>

    )
}
