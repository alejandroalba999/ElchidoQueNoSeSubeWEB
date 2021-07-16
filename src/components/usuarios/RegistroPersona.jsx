import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { Enviroments } from '../../enviroments/enviroments.url';
import { useHistory } from 'react-router';


export const RegistroPersona = ({ setReload }) => {
    const [paises, setPaises] = useState([]);
    const [estados, setEstados] = useState([]);
    const history = useHistory();
    const [paisSelect, setPaisSelect] = useState({ clave: '', nombre: '' });
    const [estadoSelect, setEstadoSelect] = useState({ clave: '', nombre: '' });
    const [esPais, setEsPais] = useState(true);
    const initialState = {
        strNombre: '',
        strPrimerApellido: '',
        strSegundoApellido: '',
        strCorreo: '',
        strDireccion: '',
        strEstado: '',
        strPais: '',
        strContrasena: '',
        nmbTelefono: '',
        blnActivo: true
    }

    useEffect(async () => {
        await axios.get(`${Enviroments.urlBack}/api/paises`).then((response) => {
            setPaises(response.data.cont.result);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const [data, setData] = useState(initialState);

    const handleInputChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        });
    }

    const selectEstado = (id, estado) => {
        try {
            setEstadoSelect({ clave: id, nombre: estado });
            setData({
                ...data,
                strEstado: estado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const selectPais = async (clave, pais) => {
        try {
            setEstadoSelect({ clave: '', nombre: '' })
            setPaisSelect({ clave: clave, nombre: pais })
            setData({
                ...data,
                strPais: clave
            });
            const res = await axios.get(`http://localhost:3000/api/paises/estados/${clave}`);
            setEstados(res.data.cont.estadosMexico)
        } catch (error) {
            setEstados(error.response.data.cont.estadosMexico)
        }

    }

    const blnPais = (bln) => {
        setEsPais(bln == true ? true : false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (paisSelect.clave == '') {
            Swal.fire({
                icon: 'error',
                text: 'Es necesario agregar un país',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            })
        } else if (estadoSelect.clave == '') {
            Swal.fire({
                icon: 'error',
                text: 'Es necesario agregar un estado',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            })
        } else {
            setData({ ...data, strPais: paisSelect.clave, strEstado: estadoSelect.clave })
            try {
                await axios.post(`${Enviroments.urlBack}/api/persona/`, data)
                    .then(res => {
                        setReload(reload => !reload);
                        setData(initialState);
                        setEstadoSelect({ clave: '', nombre: '' })
                        setPaisSelect({ clave: '', nombre: '' })
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            text: res.data.msg,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        if (window.location.href == 'http://localhost:3001/auth/register') {
                            history.push('/auth/login');
                        }
                    })
            } catch (error) {
                setReload(reload => !reload);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: error.response.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }



    }

    const reset = () => {
        setData(initialState);
        setEstadoSelect({ clave: '', nombre: '' })
        setPaisSelect({ clave: '', nombre: '' })
    }

    return (
        <div className="container">
            <h5 className="card-title">Registro de Personas</h5>
            <hr />

            <form onSubmit={handleSubmit} className="was-validated">
                <div className="tableFixHead">
                    <div className="form-group mb-3">
                        <label htmlFor="strNombre">Nombre</label>
                        <input type="text" className="form-control form-control-sm" id="strNombre" placeholder="Nombre(s)" name="strNombre"
                            value={data.strNombre}
                            onChange={handleInputChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="strPrimerApellido">Primer Apellido</label>
                        <input type="text" className="form-control form-control-sm" id="strPrimerApellido" placeholder="Primer Apellido" name="strPrimerApellido"
                            value={data.strPrimerApellido}
                            onChange={handleInputChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="strSegundoApellido">Segundo Apellido</label>
                        <input type="text" className="form-control form-control-sm" id="strSegundoApellido" placeholder="Segundo Apellido" name="strSegundoApellido"
                            value={data.strSegundoApellido}
                            onChange={handleInputChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="strCorreo">Correo Electrónico</label>
                        <input type="email" className="form-control form-control-sm" id="strCorreo" placeholder="Correo electrónico" name="strCorreo"
                            value={data.strCorreo}
                            onChange={handleInputChange} required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" />
                        <div class="invalid-feedback">Formato de correo no reconocido</div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="strContrasena">Contraseña</label>
                        <input type="password" className="form-control form-control-sm" id="strContrasena" placeholder="Contraseña" name="strContrasena"
                            value={data.strContrasena}
                            onChange={handleInputChange} required pattern=".{0}|.{8,}" />
                        <div class="invalid-feedback">La longitud de la contraseña debe ser mayor a 7</div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="nmbTelefono">Teléfono</label>
                        <input type="number" className="form-control form-control-sm" id="nmbTelefono" placeholder="Teléfono" name="nmbTelefono"
                            value={data.nmbTelefono}
                            onChange={handleInputChange} required />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="strPais">País</label>
                                <input type="button" onClick={() => blnPais(true)} data-toggle="modal" data-target="#exampleModal" className={paisSelect.nombre == '' ? "form-control  btn btn-outline-danger btn-sm" : "form-control  btn btn-outline-success btn-sm"} id="strPais" placeholder="País" name="strPais"
                                    value='Agregar País' />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="strEstado">Estado</label>
                                <input type="button" onClick={() => blnPais(false)} data-toggle="modal" data-target="#exampleModal" className={estadoSelect.nombre == '' ? "form-control  btn btn-outline-danger btn-sm" : "form-control  btn btn-outline-success btn-sm"} id="strEstado" placeholder="País" name="strEstado"
                                    value='Agregar Estado' disabled={paisSelect.nombre == ''} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="strDireccion">Dirección</label>
                        <input type="text" className="form-control form-control-sm" id="strCorreo" placeholder="Dirección" name="strDireccion"
                            value={data.strDireccion}
                            onChange={handleInputChange} required />
                    </div>
                    <hr />
                </div>
                <div className=" form-group row text-right" >
                    <div className="col-12 text-center">
                        <button className="btn btn-danger m-1 " type="button" onClick={() => reset()}>Cancelar</button>
                        <button className="btn btn-primary m-1" type="submit">Registrar</button>
                    </div>
                </div>
            </form >



            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">{esPais ? 'Lista de Países' : 'Lista de estados'}</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                paisSelect.nombre != '' && esPais &&
                                <h6>País seleccionado: {paisSelect.nombre}<hr /></h6>
                            }
                            {
                                estadoSelect.nombre != '' && !esPais &&
                                <h6>Estado seleccionado: {estadoSelect.nombre}<hr /></h6>
                            }
                            <div className="tableFixHead">
                                {
                                    esPais == true ?
                                        <table class="table table-hover " >
                                            <thead>
                                                <tr className="text-center">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Codigo del País</th>
                                                    <th scope="col">País</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    paises.map((pais, index) => {
                                                        return (
                                                            <tr key={index} className="text-center" data-dismiss="modal" onClick={() => selectPais(pais[0], pais[1])} style={{ color: pais[0] == data.strPais && 'green', borderBottom: pais[0] == data.strPais && 'solid 1px green', cursor: 'pointer' }}>
                                                                <td>{index}</td>
                                                                <td>{pais[0]}</td>
                                                                <td>{pais[1]}</td>
                                                            </tr>
                                                        )

                                                    })
                                                }

                                            </tbody>
                                        </table>
                                        :
                                        <table class="table table-hover " >
                                            <thead>
                                                <tr className="text-center">
                                                    <th scope="col">Codigo de Estado</th>
                                                    <th scope="col">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    estados.map((estado, index) => {
                                                        return (
                                                            <tr className="text-center" data-dismiss="modal" onClick={() => selectEstado(estado.id, estado.name)} style={{ color: estado.id == data.strEstado && 'green', borderBottom: estado.id == data.strEstado && 'solid 1px green', cursor: 'pointer' }}>
                                                                <td>{estado.name}</td>
                                                                <td>{estado.id}</td>
                                                            </tr>
                                                        )

                                                    })
                                                }
                                            </tbody>

                                        </table>
                                }

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}
