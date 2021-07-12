import React, { useEffect, useState, Fragment } from 'react'
import { RegistroControlPago } from './RegistroControlPago';
import { ActualizarControlPago } from './ActualizarControPago';
import { Enviroments } from '../../enviroments/enviroments.url';
import axios from 'axios';
import Swal from 'sweetalert2'
import './App.css'
export const GestControlPago = () => {

    const [reload, setReload] = useState(false)
    const [data, setData] = useState([]);
    const [mostrarActualizar, setMostrarActualizar] = useState({
        mostrar: false,
        id: ''
    });


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

    useEffect(async () => {
        await axios.get(`${Enviroments.urlBack}/api/controlPago`)
            .then(res => {
                const datos = res.data.cont.controlPago;
                console.log(datos);
                setData(datos);
            }).catch((err) => {
                console.log(err);
            })
    }, [reload]);

    useEffect(() => {
        setMostrarActualizar({
            mostrar: false
        })
    }, [reload])




    return (
        <Fragment>

            <div className="card shadow mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-3">

                            {
                                mostrar ? <ActualizarControlPago id={id} setReload={setReload} reload={reload} />
                                    :
                                    <RegistroControlPago setReload={setReload} />
                            }

                        </div>

                        <div className="col-md-8 col-lg-8 col-sm-12 mt-3">
                            <div className="container">

                                <div className="table-responsive tableFixHead">
                                    <table className="table">

                                        <thead >
                                            <tr className="text-center">
                                                <th scope="col">Vehiculo</th>
                                                <th scope="col" >Cajon</th>
                                                <th scope="col">Persona</th>
                                                <th scope="col" >Cantidad de pagos</th>
                                            </tr>
                                        </thead>



                                        <tbody  >
                                            {
                                                data.map(coche => {

                                                    return (

                                                        <tr key={coche._id} className="text-center overTable" style={{ cursor: 'pointer' }}>
                                                            <td>{coche._id.vehiculo ? coche._id.vehiculo[0].strMarca : ''}-{coche._id.vehiculo ? coche._id.vehiculo[0].strModelo : ''}</td>
                                                            <td >{coche._id.cajon ? coche._id.cajon[0].nmbCajon : ''}</td>
                                                            <td>{coche._id.persona ? coche._id.persona[0].strNombre : ''} {coche._id.persona ? coche._id.persona[0].strPrimerApellido : ''}</td>
                                                            <td >{coche.cantidad}</td>
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
