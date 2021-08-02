import React, { useEffect, useState, Fragment } from 'react'
import { RegistroControlPago } from './RegistroControlPago';
import { ActualizarControlPago } from './ActualizarControPago';
import { Enviroments } from '../../enviroments/enviroments.url';
import axios from 'axios';
import Swal from 'sweetalert2'
import * as moment from 'moment'

import './App.css'
export const GestControlPago = () => {
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([]);
    const [totalAuto, setTotalAuto] = useState();
    const [pagosCoche, setPagosCoche] = useState([]);
    const [gananciaTotal, setGananciaTotal] = useState(0);
    const [cocheSelect, setCocheSelect] = useState();
    const [ultimoPago, setUltimoPago] = useState()
    const [mostrarActualizar, setMostrarActualizar] = useState({
        mostrar: false,
        id: ''
    });

    const getPagosId = async (coche) => {
        setCocheSelect(coche);
        // console.log(cocheSelect);
        await axios.get(`${Enviroments.urlBack}/api/controlPago/obtenerIdVehiculo/${coche._id.vehiculo[0]._id}`).then(res => {
            setPagosCoche(res.data.cont.controlPago)
            const datos = res.data.cont.controlPago;
            // console.log(datos);
            let sum = [];
            for (const coche of datos) {
                sum.push({ sum: coche.nmbCantidad })
            }
            setTotalAuto(sum.reduce((a, v) => a = a + v.sum, 0));
        }).catch(err => {
            console.log(err);
        })
        await axios.get(`${Enviroments.urlBack}/api/ultimoPago/${coche._id.vehiculo[0]._id}`).then(res => {
            let last = moment(res.data.cont.ultimo.dteFechaPagoFin).diff(Date.now(), 'days');
            setUltimoPago(last)


        }).catch(err => {
            console.log(err);
        })
    }
    const editarDataCancel = () => {
        setMostrarActualizar({ mostrar: false });
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
                let sum = [];
                for (const coche of datos) {
                    sum.push({ sum: coche.cantidad })
                }
                setGananciaTotal(sum.reduce((a, v) => a = a + v.sum, 0));
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
                            <RegistroControlPago setReload={setReload} />
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
                                                <th scope="col" >Total de pagos</th>
                                                <th scope="col">Pagos realizados</th>
                                                <th scope="col">Ver Pagos</th>
                                            </tr>
                                        </thead>



                                        <tbody  >
                                            {
                                                data.map((coche, index) => {
                                                    return (
                                                        <tr key={index} className="text-center">
                                                            <td>{coche._id.vehiculo ? coche._id.vehiculo[0].strMarca : ''}-{coche._id.vehiculo ? coche._id.vehiculo[0].strModelo : ''}</td>
                                                            <td >{coche._id.cajon ? coche._id.cajon[0].nmbCajon : ''}</td>
                                                            <td>{coche._id.persona ? coche._id.persona[0].strNombre : ''} {coche._id.persona ? coche._id.persona[0].strPrimerApellido : ''}</td>
                                                            <td ><strong>$</strong>{coche.cantidad}.00</td>
                                                            <td>{coche.nmbPagosRealizados}</td>
                                                            <td><button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getPagosId(coche)} className="btn btn-outline-primary btn-sm"><i className="far fa-eye"></i></button></td>
                                                        </tr>
                                                    )

                                                })
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        data.length < 1 &&
                                        <div className="alert alert-primary text-center" role="alert">
                                            No existe informacion para mostrar
                                        </div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-md-6 text-center">
                                        <span>Total de coches: <strong>{data.length}</strong> </span>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <span>Ganancia Total: <strong>${gananciaTotal}</strong></span>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{cocheSelect ? cocheSelect._id.vehiculo[0].strMarca : ''}-{cocheSelect ? cocheSelect._id.vehiculo[0].strModelo : ''} <i class="fas fa-chevron-right fa-sm m-1"></i>{cocheSelect ? cocheSelect._id.persona[0].strNombre : ''}{cocheSelect ? cocheSelect._id.persona[0].strPrimerApellido : ''}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body" >
                            {!mostrar ?
                                <>
                                    <div className="tableFixHead">
                                        <table className="table table-striped "  >
                                            <thead>
                                                <tr className="text-center">
                                                    <th scope="col">N° Pago</th>
                                                    <th scope="col">Fecha Inicio</th>
                                                    <th scope="col">Fecha Fin</th>
                                                    <th scope="col">Cantidad</th>
                                                    <th scope="col">Editar</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    pagosCoche.length < 1 ?
                                                        <div className="alert alert-primary text-center" role="alert">
                                                            No existe informacion para mostrar
                                                        </div> :
                                                        <>
                                                            {pagosCoche.map((pago, index) => {
                                                                return (
                                                                    <tr key={pago._id} className="text-center">
                                                                        <td>{index + 1}</td>
                                                                        <td>
                                                                            {pago.dteFechaPagoInicio ? moment(pago.dteFechaPagoInicio).add(1, 'days').format('LL') : 'N/A'}
                                                                        </td>
                                                                        <td>
                                                                            {pago.dteFechaPagoFin ? moment(pago.dteFechaPagoFin).add(1, 'days').format('LL') : 'N/A'}
                                                                        </td>

                                                                        <td>{pago.nmbCantidad}</td>
                                                                        <td className="text-center"><button disabled={mostrar} className="btn btn-outline-primary  p-1 btn-sm" onClick={() => actualizar(pago._id, pago)} > <i className="far fa-edit" ></i></button></td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </>
                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                    <div>
                                        <p class="text-justify" style={{ fontSize: '12px' }}>Tiempo {ultimoPago < 0 ? 'atrasado' : 'restante'}: <label style={{ color: ultimoPago < 0 ? 'red' : 'green' }}> {ultimoPago < 0 ? ultimoPago * -1 : ultimoPago} días</label></p>
                                    </div>
                                    <p class="text-center"><strong>Total:</strong>${totalAuto}.00</p>
                                </>
                                :
                                <ActualizarControlPago id={id} setReload={setReload} reload={reload} />
                            }

                        </div>

                    </div>
                </div>
            </div>

        </Fragment >
    )
}
