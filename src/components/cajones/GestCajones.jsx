import React, { useEffect, useState, Fragment } from 'react'
import { RegistroCajon } from './RegistroCajon';
import { ActualizarCajon } from './ActualizarCajon';
import { useFetchCajones } from '../../hooks/useFetchCajones';
import axios from 'axios';
import Swal from 'sweetalert2'
import './App.css'
import { Enviroments } from '../../enviroments/enviroments.url';
export const GestCajones = () => {

    const [reload, setReload] = useState(false)

    const [mostrarActualizar, setMostrarActualizar] = useState({
        mostrar: false,
        id: ''
    });

    const rentados = (_id, blnRenta) => {
        // console.log(blnRenta);
        if (blnRenta == false) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: 'No puedes activar un cajón que no se a rentado',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                text: `¿Estas seguro de liberar el cajón rentado?`,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: `Desactivar`,
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`${Enviroments.urlBack}/api/cajonVehiculo/${_id}`)
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
                            // console.log(error.response.data.msg);
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

    }

    const estatus = async (_id, blnActivo) => {
        const valor = blnActivo === true ? false : true;
        // console.log(valor);
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
                axios.delete(`${Enviroments.urlBack}/api/cajon/${_id}/${valor}`)
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
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-3">

                            {
                                mostrar ? <ActualizarCajon id={id} setReload={setReload} reload={reload} />
                                    :
                                    <RegistroCajon setReload={setReload} />
                            }

                        </div>

                        <div className="col-md-8 col-lg-8 col-sm-12 mt-3">
                            <div className="container">

                                <div className="table-responsive tableFixHead">
                                    <table className="table">

                                        <thead >
                                            <tr >
                                                <th scope="col">Num. Cajón</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col" className="text-center">Rentado</th>
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
                                                            <td style={{ maxWidth: '100px' }}>{cajon.strDescripcion}</td>
                                                            <td className="text-center" >
                                                                <label style={{ cursor: 'pointer' }} onClick={() => rentados(cajon._id, cajon.blnRentado)}>
                                                                    {cajon.blnRentado == true ? <i style={{ color: 'blue' }} class="far fa-check-circle"></i> : <i style={{ color: 'red' }} class="far fa-times-circle"></i>} <i class="fas fa-car"></i>
                                                                </label>
                                                            </td>
                                                            <td className="text-center" style={{ cursor: 'pointer', color: cajon.blnActivo == true ? 'green' : 'red' }} onClick={() => estatus(cajon._id, cajon.blnActivo)} >{cajon.blnActivo === true ? <i class="fas fa-check-circle"></i> : <i class="fas fa-times-circle"></i>}</td>
                                                            <td className="text-center"><button disabled={mostrar} className="btn btn-outline-primary  p-1 btn-sm" onClick={() => actualizar(cajon._id, cajon)} > <i className="far fa-edit" ></i></button></td>
                                                        </tr>
                                                    )

                                                })
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        data.length < 1 &&
                                        <div class="alert alert-primary text-center" role="alert">
                                            No existe informacion para mostrar
                                        </div>
                                    }
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
