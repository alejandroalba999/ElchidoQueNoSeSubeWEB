import React, { useEffect, useState } from 'react'
import caleo_logo from '../../assets/images/logo-nav.png';
import {
    Link
} from "react-router-dom";
import { useHistory } from 'react-router';
import jwt_decode from "jwt-decode";
import './App.css'
import caleo from '../../../src/assets/images/caleo_blanco.png';

export const Navbar = ({ setReload, reload }) => {
    const [color, setColor] = useState(localStorage.getItem('color'));
    const colorLetras = localStorage.getItem('obscuro');
    const history = useHistory();
    let decoded = localStorage.getItem('authorization');
    if (localStorage.getItem("authorization")) {
        decoded = jwt_decode(localStorage.getItem("authorization"));
    } else {
        history.push('/');
    }

    useEffect(() => {
        setColor(localStorage.getItem('color'))
    }, [reload])



    return (
        <div style={{ borderBottom: '3px solid #d1d1d1', background: color }}>
            <nav className={colorLetras == 'true' ? "navbar navbar-dark  navbar-expand-lg" : "navbar navbar-light  navbar-expand-lg"} id="navbarChico" style={{ background: color }}>
                <div className="container-fluid" style={{ marginRight: '50px' }}>
                    <Link className="navbar-brand" to='/dashboard'>  <img src={colorLetras == 'true' ? caleo : caleo_logo} style={{ maxWidth: '80px', border: colorLetras == 'true' ? 'solid 1px white' : 'solid 2px rgba(0, 0, 0, 0.397)' }} alt="Caleo" /></Link>
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
                                        <Link className="nav-link" to='/account/perfil'  > <i className="fa fa-user m-1"></i>Perfil</Link>
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
                                        <Link className="nav-link" to='/account/perfil'  > <i className="fa fa-user m-1"></i>Perfil</Link>
                                    </li>
                                </ul>

                        }

                    </div>
                </div>
            </nav>

            <nav className={colorLetras == 'true' ? "navbar navbar-dark  navbar-expand-lg" : "navbar navbar-light  navbar-expand-lg"} id="navbarGrande" style={{ background: color }}>


                <div className="container-fluid navbar-collapse collapse " >
                    <Link className="navbar-brand" to='/dashboard'><img src={colorLetras == 'true' ? caleo : caleo_logo} style={{ border: colorLetras == 'true' ? 'solid 1px white' : 'solid 2px rgba(0, 0, 0, 0.397)' }} alt="Caleo" className="imagen-nav" /></Link>
                    <ul className="navbar-nav">
                        {
                            decoded.usuario.blnAdmin === true ?
                                <form className="d-flex">

                                    <li className="nav-item m-1 active">
                                        <Link className="nav-link active" aria-current="page" to='/dashboard'> <i className="fa fa-home m-1"></i> Inicio</Link>
                                    </li>
                                    <li className="nav-item m-1">
                                        <Link className="nav-link active" to='/gestionVehicular' > <i className="fa fa-car m-1"></i>Gestión Vehicular</Link>
                                    </li>
                                    <li className="nav-item m-1">
                                        <Link className="nav-link active" to='/gestionUsuarios'> <i className="fa fa-user m-1"></i>Gestión de Usuarios</Link>
                                    </li>
                                    <li className="nav-item m-1">
                                        <Link className="nav-link active" to='/gestionCajones' > <i className="fa fa-th m-1"></i>Gestión de Cajones</Link>
                                    </li>
                                    <form className="d-flex " id="formPerfil">
                                        <li className="nav-item m-1" >
                                            <Link to='/account/perfil'><img src={`http://localhost:3000/api/imagen?ruta=personas&img=${decoded.usuario.strImg}`} className="imga" alt="Logo" title="Mi perfil" /></Link>

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
                                        <Link className="nav-link active" to='/gestionVehicular' > <i className="fa fa-car m-1"></i>Gestión Vehicular</Link>
                                    </li>

                                    <form className="d-flex " id="formPerfil">
                                        <li className="nav-item m-1" >
                                            <Link to="/account/perfil"><img src={`http://localhost:3000/api/imagen?ruta=personas&img=${decoded.usuario.strImg}`} className="imga" alt="Logo" /></Link>
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
