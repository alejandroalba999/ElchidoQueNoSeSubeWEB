import React, { useEffect, useState } from 'react';
import { Enviroments } from '../../enviroments/enviroments.url';
import Swal from 'sweetalert2'
import axios from 'axios';
import moment from 'moment';
export const ActualizarControlPago = ({ setReload, id }) => {
    const [ultimoPago, setUltimoPago] = useState();

    const initialState = {
        nmbCantidad: '',
        dteFechaPagoFin: '',
        dteFechaPagoInicio: '',
        blnActivo: true
    };
    const [cargar, setCargar] = useState(true)
    const [data, setData] = useState(initialState);
    const handleInputChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        });
    }
    const reset = () => {
        setData(initialState);
        setReload(reload => !reload);
    }

    useEffect(() => {

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
        await axios.get(`${Enviroments.urlBack}/api/controlPago/obtenerId/${id}`).then(res => {
            console.log(res.data.cont.controlPago[0]);
            setData({
                ...data,
                ['nmbCantidad']: res.data.cont.controlPago[0].nmbCantidad,
                ['dteFechaPagoFin']: moment(res.data.cont.controlPago[0].dteFechaPagoFin).add(1, 'days').format('YYYY-MM-DD'),
                ['dteFechaPagoInicio']: moment(res.data.cont.controlPago[0].dteFechaPagoInicio).add(1, 'days').format('YYYY-MM-DD')
            });
        }).catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <div className="container">
            <h5 className="card-title">Actualizar Pago</h5>
            <hr />
            <form onSubmit={handleSubmit} className="was-validated">

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
                        <button className="btn btn-primary m-1" type="submit">Actualizar</button>
                    </div>
                </div>
            </form >
        </div >
    )
}