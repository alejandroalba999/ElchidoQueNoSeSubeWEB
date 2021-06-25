import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { ActualizarVehiculo } from './ActualizarVehiculo';
import { RegistroVehiculo } from './RegistroVehiculo';
// import './App.css'

export const GestVehicular = () => {

    const [reload, setReload] = useState(false)

    const [data, setData] = useState([]);

    const [info, setInfo] = useState({ cajon: [], persona: [] })

    const [activoInactivo, setActivoInactivo] = useState([{ estado: 'Activo', blnActivo: true, pointer: true }, { estado: 'Inactivo', blnActivo: false, pointer: false }])

    const [authorization, setAuthorization] = useState(localStorage.getItem('authorization'));

    const [mostrarActualizar, setMostrarActualizar] = useState({
        mostrar: false,
        id: ''
    });

    const { mostrar, id } = mostrarActualizar;

    const actualizar = (id) => {
        setMostrarActualizar({
            mostrar: true,
            id: id,
        });
    }

    const estatus = async (_id, blnActivo, marca) => {
        const valor = blnActivo === true ? false : true;
        Swal.fire({
            text: `¿Estas seguro de ${blnActivo === true ? 'desactivar' : 'activar'} el auto ${marca}?`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `${blnActivo === true ? 'Desactivar' : 'Activar'}`,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/api/vehiculo/${_id}/${valor}`)
                    .then(res => {
                        setReload(reload => !reload);
                        setActivoInactivo([{ estado: 'Activo', blnActivo: true, pointer: true }, { estado: 'Inactivo', blnActivo: false, pointer: false }])
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            text: res.data.msg,
                            showConfirmButton: false,
                            timer: 1500
                        })

                    }).catch((error) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            text: error.response.data.msg,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })

            }
        })

    }
    const infos = (object) => {
        setInfo(object)
    }
    const estado = (blnActivo) => {
        axios.get(`http://localhost:3000/api/vehiculo`, { params: { blnActivo: blnActivo } }, { headers: { 'authorization': authorization } })
            .then(res => {
                if (blnActivo == true) {
                    setActivoInactivo([{ estado: 'Activo', blnActivo: true, pointer: true }, { estado: 'Inactivo', blnActivo: false, pointer: false }])
                } else {
                    setActivoInactivo([{ estado: 'Activo', blnActivo: true, pointer: false }, { estado: 'Inactivo', blnActivo: false, pointer: true }])
                }
                const datos = res.data.cont.getVehiculos;
                setData(datos);
            }).catch((err) => {

                Swal.fire({
                    icon: 'error',
                    text: err.response.data.err.message
                })
            })
    }

    useEffect(() => {
        setMostrarActualizar({
            mostrar: false
        })
    }, [reload])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/vehiculo`, { params: { blnActivo: true } }, { headers: { 'authorization': authorization } })
            .then(res => {
                const datos = res.data.cont.getVehiculos;
                setData(datos);
            }).catch((err) => {

                Swal.fire({
                    icon: 'error',
                    text: err.response.data.error
                })
            })
    }, [reload]);

    return (
        <Fragment>
            <div className="card shadow mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-3">
                            {
                                mostrar ? <ActualizarVehiculo id={id} setReload={setReload} reload={reload} />
                                    :
                                    <RegistroVehiculo setReload={setReload} />
                            }
                        </div>
                        <div className="col-md-8 col-lg-8 col-sm-12 mt-3">
                            <div className="container">
                                <div  >
                                    <label className="p-1" style={{ border: 'solid 1px rgba(201, 178, 178, 0.600)', borderRadius: '25%' }}>
                                        {
                                            activoInactivo.map(res => {
                                                return (
                                                    <span key={res.estado} onClick={() => estado(res.blnActivo)} className={res.pointer == true ? 'badge bg-secondary' : 'badge bg-light text-dark '} style={{ cursor: 'pointer' }}>{res.estado}</span>
                                                )
                                            })
                                        }

                                        {/* <span class="badge bg-light text-dark bg-sm" style={{ cursor: 'pointer' }}>Inactivos</span> */}
                                    </label>
                                </div>
                                <hr />
                                <div className="table-responsive tableFixHead">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-center">Cajon</th>
                                                <th scope="col" className="text-center">Marca</th>
                                                <th scope="col" className="text-center">Modelo</th>
                                                <th scope="col" className="text-center">Año</th>
                                                <th scope="col" className="text-center">Placas</th>
                                                <th className="text-center" scope="col">Activo</th>
                                                <th className="text-center" scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map(vehiculo => {
                                                    return (
                                                        <tr key={vehiculo._id}>
                                                            <td className="text-center"> {vehiculo.cajon.length > 0 ? vehiculo.cajon[0].nmbCajon : 'N/A'}  <i className="fas fa-car-alt ml-2  clickImg" data-bs-toggle="modal" onClick={() => infos(vehiculo)} data-bs-target="#exampleModal" style={{ color: vehiculo.strColor }}></i></td>
                                                            <td className="text-center">
                                                                {vehiculo.strMarca}
                                                            </td>
                                                            <td className="text-center">{vehiculo.strModelo}</td>
                                                            <td className="text-center">{vehiculo.nmbAño}</td>
                                                            <td className="text-center">{vehiculo.strPlacas}</td>
                                                            <td className="text-center">{(vehiculo.blnActivo === true) ? <p style={{ cursor: 'pointer' }} onClick={() => estatus(vehiculo._id, vehiculo.blnActivo, vehiculo.strMarca)}><i className="fa fa-check-circle fa-lg" style={{ color: 'green', cursor: 'pointer' }} ></i></p> : <p onClick={() => estatus(vehiculo._id, vehiculo.blnActivo, vehiculo.strMarca)}><i className="fa fa-times-circle fa-lg" style={{ color: 'red', cursor: 'pointer' }}></i></p>}</td>
                                                            <td className="text-center">

                                                                <button disabled={mostrar} className="btn btn-primary btn-sm" onClick={() => actualizar(vehiculo._id, vehiculo)} > <i className="far fa-edit" ></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Descripcion del Vehiculo</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row ">
                                                    <div className="col-4 " style={{ borderRight: '1px solid' }}>
                                                        <h5 className="mb-3">Vehiculo</h5>
                                                        <hr />
                                                        <p><strong>Marca:</strong>{info.strMarca}</p>
                                                        <p><strong>Modelo:</strong>{info.strModelo}</p>
                                                        <p><strong>Año:</strong>{info.nmbAño}</p>
                                                        <p><strong>Placas:</strong>{info.strPlacas}</p>
                                                    </div>
                                                    <div className="col-4" style={{ borderRight: '1px solid' }}>
                                                        <h5 className="mb-3">Cajón</h5>
                                                        <hr />
                                                        <p><strong>Numero de Cajón:</strong>{info.cajon.length > 0 ? info.cajon[0].nmbCajon : 'N/A'}</p>
                                                        <p><strong>Descripción:</strong>{info.cajon.length > 0 ? info.cajon[0].strDescripcion : 'N/A'}</p>
                                                    </div>
                                                    <div className="col-4">
                                                        <h5 className="mb-3">Propietario</h5>
                                                        <hr />
                                                        <p><strong>Nombre:</strong>{info.persona.length > 0 ? info.persona[0].strNombre + ' ' + info.persona[0].strPrimerApellido : 'N/A'}</p>
                                                        <p><strong>Correo:</strong>{info.persona.length > 0 ? info.persona[0].strCorreo : 'N/A'}</p>
                                                        <p><strong>Telefono:</strong>{info.persona.length > 0 ? info.persona[0].nmbTelefono : 'N/A'}</p>
                                                        <p><strong>Dirección:</strong>{info.persona.length > 0 ? info.persona[0].strDireccion : 'N/A'}</p>
                                                    </div>
                                                </div>



                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span>Total de vehiculos: <strong>{data.length}</strong> </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

