import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { ActualizarPersonas } from './ActualizarPersonas'
import { RegistroPersona } from './RegistroPersona'
import { Enviroments } from '../../enviroments/enviroments.url';
import './App.css'

export const GestUsuarios = () => {

    const [reload, setReload] = useState(false)

    const [data, setData] = useState([]);
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

    const estatus = async (_id, blnActivo, nombre, apellido) => {
        const valor = blnActivo === true ? false : true;
        Swal.fire({
            text: `¿Estas seguro de ${blnActivo === true ? 'desactivar' : 'activar'} a ${nombre} ${apellido}?`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `${blnActivo === true ? 'Desactivar' : 'Activar'}`,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Enviroments.urlBack}/api/persona/${_id}/${valor}`)
                    .then(res => {
                        setReload(reload => !reload);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            text: res.data.msg,
                            showConfirmButton: false,
                            timer: 1500
                        })

                    }).catch((error) => {
                        console.log(error.response.data.msg);
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

    useEffect(() => {
        setMostrarActualizar({
            mostrar: false
        })
    }, [reload])

    useEffect(() => {
        axios.get(`${Enviroments.urlBack}/api/persona`, { headers: { 'authorization': authorization } })
            .then(res => {
                const datos = res.data.cont.persona;
                setData(datos);
            }).catch((err) => {
                console.log(err);
            })
    }, [reload]);

    return (
        <Fragment>
            <div className="card shadow mt-4 ">
                <div className="card-body" style={{ maxHeight: '50%', overflow: 'scroll' }}>
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-3 p-0">
                            {
                                mostrar ? <ActualizarPersonas id={id} setReload={setReload} reload={reload} />
                                    :
                                    <RegistroPersona setReload={setReload} />
                            }
                        </div>
                        <div className="col-md-8 col-lg-8 col-sm-12 mt-3">
                            <div className="container">
                                <div className="table-responsive tableFixHead">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-center">Nombre Completo</th>
                                                <th scope="col" className="text-center">Email</th>
                                                <th className="text-center" scope="col">Rol</th>
                                                <th className="text-center" scope="col">Activo</th>
                                                <th className="text-center" scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map(persona => {
                                                    return (
                                                        <tr key={persona._id}>

                                                            <td className='text-left'>
                                                                <div className="row " >
                                                                    <div className="col-6 text-center">
                                                                        <img src={`${Enviroments.urlBack}/api/imagen?ruta=personas&img=${persona.strImg}`} className="img" alt="Logo" />
                                                                    </div>
                                                                    <div className="col-6 p-0 m-0">
                                                                        {persona.strNombre} {persona.strPrimerApellido} {persona.strSegundoApellido}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-center">{persona.strCorreo}</td>
                                                            <td className="text-center"><span className={persona.blnAdmin == false ? "badge rounded-pill bg-dark" : 'badge rounded-pill bg-danger'}>{persona.blnAdmin == true ? 'Admin' : 'Usuario'}</span></td>
                                                            <td className="text-center">{(persona.blnActivo === true) ? <p style={{ cursor: 'pointer' }} onClick={() => estatus(persona._id, persona.blnActivo, persona.strNombre, persona.strPrimerApellido)}><i className="fa fa-check-circle fa-lg" style={{ color: 'green', cursor: 'pointer' }} ></i></p> : <p onClick={() => estatus(persona._id, persona.blnActivo, persona.strNombre, persona.strPrimerApellido)}><i className="fa fa-times-circle fa-lg" style={{ color: 'red', cursor: 'pointer' }}></i></p>}</td>
                                                            <td className="text-center">
                                                                <button disabled={mostrar} className="btn btn-outline-primary  p-1 btn-sm" onClick={() => actualizar(persona._id, persona)} > <i className="far fa-edit" ></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        {
                                            data.length < 1 &&
                                            <div class="alert alert-primary text-center" role="alert">
                                                No existe informacion para mostrar
                                            </div>
                                        }
                                    </table>
                                </div>
                                <span>Total de personas: <strong>{data.length}</strong> </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}
