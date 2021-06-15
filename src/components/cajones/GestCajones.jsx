import React, { useEffect, useState, Fragment } from 'react'
import { RegistroCajon } from './RegistroCajon';
import { ActualizarCajon } from './ActualizarCajon';
import { useFetchCajones } from '../../hooks/useFetchCajones';
import axios from 'axios';
import Swal from 'sweetalert2'
import './App.css'
export const GestCajones = () => {

    const [reload, setReload] = useState(false)

    const [mostrarActualizar, setMostrarActualizar] = useState({
        mostrar: false,
        id: ''
    });

    const estatus = async (_id, blnActivo) => {
        const valor = blnActivo === true ? false : true;
        console.log(valor);
        Swal.fire({
            text: `¿Estas seguro de ${blnActivo === true ? 'desactivar' : 'activar'} el cajón?`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `${blnActivo === true ? 'Desactivar' : 'Activar'}`,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/api/cajon/${_id}/${valor}`)
                    .then(res => {
                        console.log(res);
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

    const actualizar = (id) => {
        setMostrarActualizar({
            mostrar: true,
            id: id,
        });
    }

    const { mostrar, id, cajon } = mostrarActualizar;

    useEffect(() => {
        setMostrarActualizar({
            mostrar: false
        })
    }, [reload])

    const { data } = useFetchCajones(reload);

    return (
        <Fragment>

            <div className="card shadow mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-4 mt-3">

                            {
                                mostrar ? <ActualizarCajon id={id} setReload={setReload} reload={reload} />
                                    :
                                    <RegistroCajon setReload={setReload} />
                            }

                        </div>

                        <div className="col-8 mt-3">
                            <div className="container">

                                <div className="table-responsive tableFixHead">
                                    <table className="table">

                                        <thead >
                                            <tr >
                                                <th scope="col">Num. Cajón</th>
                                                <th scope="col">Descripción</th>
                                                <th className="text-center" scope="col">Activo</th>
                                                <th className="text-center" scope="col">Acciones</th>
                                            </tr>
                                        </thead>



                                        <tbody  >
                                            {
                                                data.map(cajon => {

                                                    return (

                                                        <tr key={cajon._id}>
                                                            <td>{cajon.nmbCajon}</td>
                                                            <td>{cajon.strDescripcion}</td>
                                                            <td className="text-center">{(cajon.blnActivo === true) ? <p style={{ cursor: 'pointer' }} onClick={() => estatus(cajon._id, cajon.blnActivo)}><i className="fa fa-check-circle fa-lg" style={{ color: 'green', cursor: 'pointer' }} ></i></p> : <p onClick={() => estatus(cajon._id, cajon.blnActivo)}><i className="fa fa-times-circle fa-lg" style={{ color: 'red', cursor: 'pointer' }}></i></p>}</td>
                                                            <td className="text-center"><button disabled={mostrar} className="btn btn-primary btn-sm" onClick={() => actualizar(cajon._id, cajon)} > <i className="fa fa-edit" ></i></button></td>
                                                        </tr>
                                                    )

                                                })
                                            }
                                        </tbody>




                                    </table>

                                </div>
                                <span>Total de cajones: <strong>{data.length}</strong> </span>
                            </div>


                        </div>

                    </div>

                </div>
            </div>

        </Fragment >
    )
}
