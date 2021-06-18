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

    // console.log(window.screen);



    return (
        <div style={{ borderBottom: '3px solid #d1d1d1' }}>
            <nav className=" navbar navbar-light bg-light navbar-expand-lg" id="navbarChico">
                <div className="container-fluid" style={{ marginRight: '50px' }}>
                    <Link className="navbar-brand" to='/dashboard'><img src={caleo_logo} alt="Caleo" style={{ maxWidth: '130px' }} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse container-fluid " id="navbarSupportedContent">

                        {
                            decoded.usuario.blnAdmin === true ?
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
                                    <li className="nav-item m-1">
                                        <Link className="nav-link" to='' onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} > <i className="fa fa-sign-out-alt m-1"></i>Salir</Link>
                                    </li>
                                    <li className="nav-item m-1">
                                        <Link className="nav-link" to='/perfil'  > <i className="fa fa-user m-1"></i>Perfil</Link>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav">
                                    <li className="nav-item m-1 active">
                                        <Link className="nav-link active" aria-current="page" to='/dashboard'> <i className="fa fa-home m-1"></i> Inicio</Link>
                                    </li>
                                    <li className="nav-item m-1">
                                        <Link className="nav-link" to='/gestionVehicular' > <i className="fa fa-car m-1"></i>Gestión Vehicular</Link>
                                    </li>
                                    <li className="nav-item m-1">
                                        <Link className="nav-link" to='' onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} > <i className="fa fa-sign-out-alt m-1"></i>Salir</Link>
                                    </li>
                                    <li className="nav-item m-1">
                                        <Link className="nav-link" to='/perfil'  > <i className="fa fa-user m-1"></i>Perfil</Link>
                                    </li>
                                </ul>

                        }

                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-light bg-light navbar-expand-lg" id="navbarGrande">
                <div className="container-fluid navbar-collapse collapse " >
                    <Link className="navbar-brand" to='/dashboard'><img src={caleo_logo} alt="Caleo" style={{ maxWidth: '100px', transform: 'revert' }} /></Link>
                    <ul className="navbar-nav">
                        {
                            decoded.usuario.blnAdmin === true ?
                                <form className="d-flex">

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
                                    <form className="d-flex " id="formPerfil">
                                        <li className="nav-item m-1" >
                                            {/* <b>Mi perfil</b> */}
                                            <img src={`http://localhost:3000/api/imagen?ruta=personas&img=${decoded.usuario.strImg}`} className="imga" alt="Logo" title="Mi perfil" />
                                        </li>

                                        <li className="nav-item m-1">
                                            <Link className="nav-link logOut" to="" onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} ><i className="fas fa-sign-out-alt" > Salir</i></Link>
                                        </li>

                                    </form>


                                </form>
                                :
                                <form className="d-flex">

                                    <li className="nav-item m-1 active">
                                        <Link className="nav-link active" aria-current="page" to='/dashboard'> <i className="fa fa-home m-1"></i> Inicio</Link>
                                    </li>
                                    <li className="nav-item m-1">
                                        <Link className="nav-link" to='/gestionVehicular' > <i className="fa fa-car m-1"></i>Gestión Vehicular</Link>
                                    </li>

                                    <form className="d-flex " id="formPerfil">
                                        <li className="nav-item m-1" >
                                            {/* <b>Mi perfil</b> */}
                                            <img src={`http://localhost:3000/api/imagen?ruta=personas&img=${decoded.usuario.strImg}`} className="imga" alt="Logo" title="Mi perfil" />
                                        </li>

                                        <li className="nav-item m-1">
                                            <Link className="nav-link logOut" to="" onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} ><i className="fas fa-sign-out-alt" > Salir</i></Link>
                                        </li>

                                    </form>


                                </form>
                        }

                    </ul>

                </div>
            </nav>
        </div>


    )
}
