import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import Swal from 'sweetalert2'

export const ActualizarVehiculo = ({ setReload, id }) => {

    const initialState = {
        _id: id,
        strMarca: '',
        strModelo: '',
        nmbAño: 0,
        strDescripcion: '',
        strPlacas: '',
        strColor: '',
        idCajon: '',
        idPersona: '',
        blnActivo: true
    }

    const [newData, setNewData] = useState(initialState);

    const reset = () => {
        setReload(reload => !reload);
    }

    const handleInputChange = ({ target }) => {
        setNewData({
            ...newData,
            [target.name]: target.value
        });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log(newData);
            await axios.put(`http://localhost:3000/api/persona/`, newData)
                .then(res => {
                    setReload(reload => !reload);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: res.data.msg,
                        showConfirmButton: false,
                        timer: 1500
                    })

                })
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: error.response.data.msg,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    useEffect(async () => {
        await axios.get(`http://localhost:3000/api/vehiculo/obtenerId/${id}`)
            .then(res => {
                // console.log(res.data.cont.cajon[0]);
                const datos = res.data.cont.obtenerVehiculo[0];
                setNewData(datos);

            }).catch((err) => {
                console.log(err);
            })

    }, [])


    return (
        <div className="container">
            <div className="row">
                <div className="col-11 col-lg-11">
                    <h5 className="card-title">Actualizar Vehiculo</h5>
                </div>
                <div className="col-1 col-lg-1" style={{ cursor: 'pointer', color: 'red' }}>
                    <i className="far fa-times-circle" onClick={() => reset()}></i>
                </div>
            </div>
            <hr />
            <form onSubmit={handleUpdate}>
                <div className="form-group mb-3">
                    <label htmlFor="strMarca">Marca</label>
                    <input type="text" className="form-control" id="strMarca" placeholder="Marca vehiculo" name="strMarca"
                        value={newData.strMarca}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strModelo">Modelo</label>
                    <input type="text" className="form-control" id="strModelo" placeholder="Modelo vehiculo" name="strModelo"
                        value={newData.strModelo}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="nmbAño">Año</label>
                    <input type="number" className="form-control" id="nmbAño" placeholder="Año vehiculo" name="nmbAño"
                        value={newData.nmbAño}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strDescripcion">Descripción</label>
                    <input type="text" className="form-control" id="strDescripcion" placeholder="Descripción vehiculo" name="strDescripcion"
                        value={newData.strDescripcion}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strPlacas">Placas</label>
                    <input type="text" className="form-control" id="strPlacas" placeholder="Placas vehiculo" name="strPlacas"
                        value={newData.strPlacas}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3 ">
                    <label htmlFor="strColor">Color</label>
                    <input type="text" className="form-control input-color" id="strColor" placeholder="Color vehiculo" name="strColor"
                        value={newData.strColor}
                        onChange={handleInputChange} required />
                </div>
                <div className=" form-group row text-right" >
                    <div className="col-12 text-center">
                        <button className="btn btn-primary m-1" type="submit">Actualizar</button>
                    </div>
                </div>
            </form >
        </div >
    )
}


ActualizarVehiculo.propTypes = {
    setReload: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};