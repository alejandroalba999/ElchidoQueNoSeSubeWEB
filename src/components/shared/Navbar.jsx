import React, { useEffect, useState } from 'react'
import {
    Link
} from "react-router-dom";
import { useHistory } from 'react-router';
import jwt_decode from "jwt-decode";
import './App.css'


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
        <div className="fixed-top" style={{ borderBottom: '2px solid #d1d1d1', background: color }}>
            <nav className={colorLetras == 'true' ? "navbar navbar-dark  navbar-expand-lg" : "navbar navbar-light  navbar-expand-lg"} id="navbarChico" style={{ background: color }}>
                <div className="container-fluid" style={{ marginRight: '50px' }}>
                    <Link className="navbar-brand" to='/dashboard'> <button className={colorLetras == 'true' ? 'btn btn-outline-warning btn-sm' : 'btn btn-outline-dark btn-sm'}>CALEO</button> </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse container-fluid " id="navbarSupportedContent">
                        {
                            decoded.usuario.blnAdmin === true ?
                                <ul className="navbar-nav">
                                    <li className="nav-item m-1 active">
                                        <button className="btn btn-outline-secondary btn-sm btn-block w-100" type="button" >
                                            <Link className="nav-link active" aria-current="page" to='/rentarme'> <i class="fas fa-dollar-sign"></i> Pagos</Link>
                                        </button>
                                    </li>
                                    <li className="nav-item m-1">
                                        <button className="btn btn-outline-secondary btn-sm btn-block w-100" type="button" >
                                            <Link className="nav-link" to='/rentar/undefined' > <i className="fa fa-car m-1"></i>Gestión Vehicular</Link>
                                        </button>
                                    </li>
                                    <li className="nav-item m-1">
                                        <button className="btn btn-outline-secondary btn-sm btn-block w-100" type="button" >
                                            <Link className="nav-link" to='/gestionUsuarios'> <i className="fa fa-user m-1"></i>Gestión de Usuarios</Link>
                                        </button>
                                    </li>
                                    <li className="nav-item m-1">
                                        <button className="btn btn-outline-secondary btn-sm btn-block w-100" type="button" >
                                            <Link className="nav-link" to='/gestionCajones' > <i className="fa fa-th m-1"></i>Gestión de Cajones</Link>
                                        </button>
                                    </li>
                                    <li className="nav-item m-1">
                                        <button className="btn btn-outline-secondary btn-sm btn-block w-100" type="button" >
                                            <Link className="nav-link" to='' onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} > <i className="fa fa-sign-out-alt m-1"></i>Salir</Link>
                                        </button>
                                    </li>
                                    <li className="nav-item m-1">
                                        <button className="btn btn-outline-secondary btn-sm btn-block w-100" type="button" >
                                            <Link className="nav-link" to='/account/perfil'  > <i className="fa fa-user m-1"></i>Perfil</Link>
                                        </button>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav m-2" >
                                    <li className="nav-item m-1 " >
                                        <button className="btn btn-outline-secondary btn-sm btn-block w-100" type="button" >
                                            <Link className="nav-link" to='/rentar/undefined' > <i className="fa fa-car m-1"></i>Gestión Vehicular</Link>
                                        </button>
                                    </li>
                                    <li className="nav-item m-1" >
                                        <button className="btn btn-outline-secondary btn-sm btn-block w-100" type="button" >
                                            <Link className="nav-link" to='/account/perfil'  > <i className="fa fa-user m-1"></i>Perfil de usuario</Link>
                                        </button>
                                    </li>
                                    <li className="nav-item m-1" >
                                        <button className="btn btn-outline-secondary btn-sm btn-block w-100" type="button" >
                                            <Link className="nav-link" to='' onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} > <i className="fa fa-sign-out-alt m-1"></i>Salir</Link>
                                        </button>
                                    </li>

                                </ul>

                        }

                    </div>
                </div>
            </nav>

            <nav className={colorLetras == 'true' ? "navbar navbar-dark  navbar-expand-lg" : "navbar navbar-light  navbar-expand-lg"} id="navbarGrande" style={{ background: color }}>


                <div className="container-fluid navbar-collapse collapse " >
                    <Link className="navbar-brand" to='/dashboard'><button className={colorLetras == 'true' ? 'btn btn-outline-warning btn-sm' : 'btn btn-outline-dark btn-sm'}>CALEO</button></Link>



                    <ul className="navbar-nav">
                        {
                            decoded.usuario.blnAdmin === true ?
                                <form className="d-flex">

                                    <li className="nav-item m-1 active">
                                        <Link className="nav-link active" aria-current="page" to='/rentarme'><i class="fas fa-dollar-sign"></i> Pagos</Link>
                                    </li>
                                    <li className="nav-item m-2">
                                        <div class="btn-group dropstart">
                                            <button type="button" className={colorLetras == 'true' ? 'btn btn-outline-light btn-sm dropdown-toggle' : 'btn btn-outline-light text-dark btn-sm dropdown-toggle'} data-bs-toggle="dropdown" aria-expanded="false">
                                                Gestión
                                            </button>
                                            <ul className={colorLetras == 'true' ? 'dropdown-menu dropdown-menu-dark p-2' : 'dropdown-menu dropdown-menu-light p-2'} style={{ border: 'solid 1px grey' }} >
                                                <li className="nav-item m-1">
                                                    <Link className="nav-link active" className={colorLetras == 'true' ? 'btn btn-outline-light btn-sm ' : 'btn btn-outline-dark btn-sm '} to='/rentar/undefined' > <i className="fa fa-car m-1"></i>Gestión Vehicular</Link>
                                                </li>
                                                <li className="nav-item m-1">
                                                    <Link className="nav-link active" className={colorLetras == 'true' ? 'btn btn-outline-light btn-sm ' : 'btn btn-outline-dark btn-sm '} to='/gestionUsuarios'> <i className="fa fa-user m-1"></i>Gestión de Usuarios</Link>
                                                </li>
                                                <li className="nav-item m-1">
                                                    <Link className="nav-link active" className={colorLetras == 'true' ? 'btn btn-outline-light btn-sm ' : 'btn btn-outline-dark btn-sm '} to='/gestionCajones' > <i className="fa fa-th m-1"></i>Gestión de Cajones</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>


                                    <li className="nav-item m-2">
                                        <div class="btn-group dropstart">
                                            <button type="button" className={colorLetras == 'true' ? 'btn btn-outline-light btn-sm dropdown-toggle' : 'btn btn-outline-light text-dark btn-sm dropdown-toggle'} data-bs-toggle="dropdown" aria-expanded="false">
                                                Cuenta
                                            </button>
                                            <ul className={colorLetras == 'true' ? 'dropdown-menu dropdown-menu-dark p-2' : 'dropdown-menu dropdown-menu-light p-2'} style={{ border: 'solid 1px grey' }} >
                                                <li className="nav-item m-1" style={{ border: 'solid 1px grey' }} >
                                                    <Link to='/account/perfil' >
                                                        <button type="button" className={colorLetras == 'true' ? 'btn btn-outline-light btn-sm m-2' : 'btn btn-outline-dark btn-sm m-2'}>Perfil Usuario <i class="far fa-user"></i></button>
                                                    </Link>
                                                </li>

                                                <li className="nav-item m-1" style={{ border: 'solid 1px grey' }}>
                                                    <Link className="nav-link logOut" to="" onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} >
                                                        <button type="button" className={colorLetras == 'true' ? 'btn btn-outline-light btn-sm ' : 'btn btn-outline-dark btn-sm '}>Cerrar Sesión<i class="fas fa-sign-out-alt"></i></button>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>


                                </form>
                                :
                                <form className="d-flex">

                                    <li className="nav-item m-1">
                                        <Link className="nav-link active" to='/rentar/undefined' > <i className="fa fa-car m-1"></i>Gestión Vehicular</Link>
                                    </li>

                                    <li className="nav-item m-2">
                                        <div class="btn-group dropstart">
                                            <button type="button" className={colorLetras == 'true' ? 'btn btn-outline-light btn-sm dropdown-toggle' : 'btn btn-outline-light text-dark btn-sm dropdown-toggle'} data-bs-toggle="dropdown" aria-expanded="false">
                                                Cuenta
                                            </button>
                                            <ul className={colorLetras == 'true' ? 'dropdown-menu dropdown-menu-dark p-2' : 'dropdown-menu dropdown-menu-light p-2'} style={{ border: 'solid 1px grey' }} >
                                                <li className="nav-item m-1" style={{ border: 'solid 1px grey' }} >
                                                    <Link to='/account/perfil' >
                                                        <button type="button" className={colorLetras == 'true' ? 'btn btn-outline-light btn-sm m-2' : 'btn btn-outline-dark btn-sm m-2'}>Perfil Usuario <i class="far fa-user"></i></button>
                                                    </Link>
                                                </li>

                                                <li className="nav-item m-1" style={{ border: 'solid 1px grey' }}>
                                                    <Link className="nav-link logOut" to="" onClick={() => (history.push(`/auth/login`), localStorage.removeItem('authorization'))} >
                                                        <button type="button" className={colorLetras == 'true' ? 'btn btn-outline-light btn-sm ' : 'btn btn-outline-dark btn-sm '}>Cerrar Sesión<i class="fas fa-sign-out-alt"></i></button>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>


                                </form>
                        }

                    </ul>

                </div>
            </nav>

        </div >


    )
}
