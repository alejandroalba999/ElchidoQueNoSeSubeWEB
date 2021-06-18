import React from 'react'
import caleo_logo from '../../assets/images/caleo_logo.png'
import {
    Link
} from "react-router-dom";
import { useHistory } from 'react-router';
import jwt_decode from "jwt-decode";
import './App.css'


export const Navbar = () => {
    const history = useHistory();
    let decoded = localStorage.getItem('authorization');
    if (localStorage.getItem("authorization")) {
        decoded = jwt_decode(localStorage.getItem("authorization"));
    }

    console.log(window.screen);



    return (
        <div style={{ borderBottom: '3px solid #d1d1d1' }}>
            {/* <nav className=" navbar navbar-light bg-light navbar-expand-lg" id="navbarChico">
                <div className="container-fluid" style={{ marginRight: '50px' }}>
                    <Link className="navbar-brand" to='/dashboard'><img src={caleo_logo} alt="Caleo" style={{ maxWidth: '130px' }} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse container-fluid " id="navbarSupportedContent">
                        <ul className="navbar-nav">
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
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>

                            <li className=" nav-item pull-right">
                                <div className="row">
                                    <div className="col-8 ">

                                    </div>
                                    <div className="col-2 ">
                                        <img src={`http://localhost:3000/api/imagen?ruta=personas&img=${decoded.usuario.strImg}`} className="imga" alt="Logo" />
                                    </div>
                                    <div className="col-2 ">
                                        <Link className="nav-link logOut" to="" onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} ><i className="fas fa-sign-out-alt" > <b style={{ fontFamily: '"Poppins", sans-serif' }}>Salir</b></i></Link>
                                    </div>
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav> */}
            <nav class="navbar navbar-light bg-light navbar-expand-lg" id="navbarGrande">
                <div class="container-fluid navbar-collapse collapse " >
                    <Link className="navbar-brand" to='/dashboard'><img src={caleo_logo} alt="Caleo" style={{ maxWidth: '100px' }} /></Link>
                    <ul className="navbar-nav">
                        <form class="d-flex">
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
                            <form class="d-flex " id="formPerfil">
                                <img src={`http://localhost:3000/api/imagen?ruta=personas&img=${decoded.usuario.strImg}`} className="imga" alt="Logo" />
                                <li className="nav-item m-1">
                                    <Link className="nav-link logOut" to="" onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} ><i className="fas fa-sign-out-alt" > Salir</i></Link>
                                </li>

                                {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button> */}
                            </form>

                            {/* <li className=" nav-item pull-right">
                                <div className="row">
                                    <div className="col-8 ">

                                    </div>
                                    <div className="col-2 ">
                                        <img src={`http://localhost:3000/api/imagen?ruta=personas&img=${decoded.usuario.strImg}`} className="imga" alt="Logo" />
                                    </div>
                                    <div className="col-2 ">
                                        <Link className="nav-link logOut" to="" onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} ><i className="fas fa-sign-out-alt" > <b style={{ fontFamily: '"Poppins", sans-serif' }}>Salir</b></i></Link>
                                    </div>
                                </div>
                            </li> */}
                        </form>
                    </ul>

                </div>
            </nav>
        </div>


    )
}
