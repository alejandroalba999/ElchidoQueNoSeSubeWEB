import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import Swal from 'sweetalert2'

export const ActualizarPersonas = ({ setReload, id }) => {

    const initialState = {
        _id: id,
        strNombre: '',
        strPrimerApellido: '',
        strSegundoApellido: '',
        strCorreo: '',
        strDireccion: '',
        strContrasena: '',
        nmbTelefono: '',
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
        await axios.get(`http://localhost:3000/api/persona/obtenerId/${id}`)
            .then(res => {
                // console.log(res.data.cont.cajon[0]);
                const datos = res.data.cont.persona[0];
                setNewData(datos);

            }).catch((err) => {
                console.log(err);
            })

    }, [])


    return (
        <div className="container">
            <div className="row">
                <div className="col-11 col-lg-11">
                    <h5 className="card-title">Actualizar Persona</h5>
                </div>
                <div className="col-1 col-lg-1" style={{ cursor: 'pointer', color: 'red' }}>
                    <i className="far fa-times-circle" onClick={() => reset()}></i>
                </div>
            </div>
            <hr />
            <form onSubmit={handleUpdate} className="was-validated">
                <div className="form-group mb-3">
                    <label htmlFor="strNombre">Nombre</label>
                    <input type="text" className="form-control form-control-sm" id="strNombre" placeholder="Nombre(s)" name="strNombre"
                        value={newData.strNombre}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strPrimerApellido">Primer Apellido</label>
                    <input type="text" className="form-control form-control-sm" id="strPrimerApellido" placeholder="Primer Apellido" name="strPrimerApellido"
                        value={newData.strPrimerApellido}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strSegundoApellido">Segundo Apellido</label>
                    <input type="text" className="form-control form-control-sm" id="strSegundoApellido" placeholder="Segundo Apellido" name="strSegundoApellido"
                        value={newData.strSegundoApellido}
                        onChange={handleInputChange} required />
                </div>
                {/* <div className="form-group mb-3">
                    <label htmlFor="strCorreo">Correo Electrónico</label>
                    <input type="email" className="form-control form-control-sm" id="strCorreo" placeholder="Correo electrónico" name="strCorreo"
                        value={newData.strCorreo}
                        onChange={handleInputChange} required />
                </div> */}
                <div className="form-group mb-3">
                    <label htmlFor="nmbTelefono">Teléfono</label>
                    <input type="number" className="form-control form-control-sm" id="nmbTelefono" placeholder="Teléfono" name="nmbTelefono"
                        value={newData.nmbTelefono}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strDireccion">Dirección</label>
                    <input type="text" className="form-control form-control-sm" id="strCorreo" placeholder="Dirección" name="strDireccion"
                        value={newData.strDireccion}
                        onChange={handleInputChange} required />
                </div>
                {/* <div className="form-group mb-3">
                    <label htmlFor="strContrasena">Contraseña</label>
                    <input type="password" className="form-control form-control-sm" id="strContrasena" placeholder="Contraseña" name="strContrasena"
                        value={newData.strContrasena}
                        onChange={handleInputChange} required />
                </div> */}
                <div className=" form-group row text-right" >
                    <div className="col-12 text-center">
                        <button className="btn btn-primary m-1" type="submit">Actualizar</button>
                    </div>
                </div>
            </form >
        </div >
    )
}


ActualizarPersonas.propTypes = {
    setReload: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
