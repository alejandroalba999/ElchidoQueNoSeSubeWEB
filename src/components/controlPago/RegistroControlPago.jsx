
import React, { useEffect, useState } from 'react';
import { Enviroments } from '../../enviroments/enviroments.url';
import Swal from 'sweetalert2'
import axios from 'axios';
import moment from 'moment';
export const RegistroControlPago = ({ setReload }) => {
    const [ultimoPago, setUltimoPago] = useState();
    const initialState = {
        nmbCantidad: '470',
        dteFechaPagoFin: '',
        dteFechaPagoInicio: ultimoPago != null ? ultimoPago.dteFechaPagoFin : '',
        idVehiculo: '',
        blnActivo: true
    };
    const [cargar, setCargar] = useState(true)
    const [data, setData] = useState(initialState);
    const [vehiculo, setVehiculo] = useState([]);
    const handleInputChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        });

        if (target.name == 'idVehiculo') {
            axios.get(`${Enviroments.urlBack}/api/ultimoPago/${target.value}`).then(res => {
                setUltimoPago(res.data.cont.ultimo)
                console.log(moment(res.data.cont.ultimo.dteFechaPagoFin).add(1, 'days').format('YYYY-MM-DD'));

            }).catch(err => {
                console.log(err);
            })
        }
    }
    const reset = () => {
        setData(initialState);
    }

    useEffect(() => {
        setData({
            ...data,
            ['dteFechaPagoInicio']: ultimoPago != null ? moment(ultimoPago.dteFechaPagoFin).add(1, 'days').format('YYYY-MM-DD') : '',
            ['dteFechaPagoFin']: ultimoPago != null ? moment(ultimoPago.dteFechaPagoFin).add(1, 'months').add(1, 'days').format('YYYY-MM-DD') : ''
        });
    }, [ultimoPago])



    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${Enviroments.urlBack}/api/controlPago`, data).then(res => {
            setCargar(false);
            Swal.fire({
                position: 'top-end',
                title: 'Información registrada exitosamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            setCargar(true)
            setReload(reload => !reload);
            setData(initialState);
        }).catch(err => {
            console.log(err.response.data.msg);
            Swal.fire({
                title: 'Error al registrar el pago',
                text: err.response.data.msg,
                icon: 'error',
                showConfirmButton: true,
            })
        })
    }

    useEffect(async () => {
        await axios.get(`${Enviroments.urlBack}/api/vehiculo/obtenerSoloVehiculo`).then(res => {
            setVehiculo(res.data.cont.obtenerCoche);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <div className="container">
            <h5 className="card-title">Registro de Pagos</h5>
            <hr />
            <form onSubmit={handleSubmit} className="was-validated">
                {
                    cargar &&
                    <div className="form-group mb-3">
                        <label htmlFor="idVehiculo">Asignar Vehiculo</label>
                        <select class="form-select form-select-sm" required name="idVehiculo" onChange={handleInputChange} aria-label="Default select example" >
                            <option value={''} defaultValue={'Seleccione Vehiculo...'}>Seleccione vehiculo ...</option>
                            {
                                vehiculo.map(coche => {
                                    return (
                                        <option key={coche._id} value={coche._id} >{coche.strMarca}-{coche.strModelo} </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                }
                <div className="form-group mb-3">
                    <label htmlFor="dteFechaPagoInicio">Fecha inicio del pago:</label>
                    <input type="date" className="form-control form-control-sm" id="dteFechaPagoInicio" name="dteFechaPagoInicio"
                        value={data.dteFechaPagoInicio}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="dteFechaPagoFin">Fecha fin del pago:</label>
                    <input type="date" className="form-control form-control-sm" id="dteFechaPagoFin" name="dteFechaPagoFin"
                        value={data.dteFechaPagoFin}
                        onChange={handleInputChange} min={moment(data.dteFechaPagoInicio).add(1, 'days').format('YYYY-MM-DD')} disabled={data.dteFechaPagoInicio == ''} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="nmbCantidad">Precio a pagar:</label>
                    <input type="number" className="form-control form-control-sm" id="nmbCantidad" placeholder="Cantidad a pagar" name="nmbCantidad"
                        value={data.nmbCantidad}
                        onChange={handleInputChange} required />
                </div>
                <hr />
                <div className=" form-group row text-right" >
                    <div className="col-12 text-center">
                        <button className="btn btn-danger m-1 " type="button" onClick={() => reset()}>Cancelar</button>
                        <button className="btn btn-primary m-1" type="submit">Registrar</button>
                    </div>
                </div>
            </form >
        </div >
    )
}
