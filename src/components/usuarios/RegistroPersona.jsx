import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { Enviroments } from '../../enviroments/enviroments.url';
import { useHistory } from 'react-router';


export const RegistroPersona = ({ setReload }) => {
    const history = useHistory();
    const initialState = {
        strNombre: '',
        strPrimerApellido: '',
        strSegundoApellido: '',
        strCorreo: '',
        strDireccion: '',
        strContrasena: '',
        nmbTelefono: '',
        blnActivo: true
    }

    const [data, setData] = useState(initialState);

    const handleInputChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${Enviroments.urlBack}/api/persona/`, data)
                .then(res => {
                    setReload(reload => !reload);
                    setData(initialState);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: res.data.msg,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    if (window.location.href == 'http://localhost:3001/auth/register') {
                        history.push('/auth/login');
                    }
                })
        } catch (error) {
            setReload(reload => !reload);
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: error.response.data.msg,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    const reset = () => {
        setData(initialState);
    }

    return (
        <div className="container">
            <h5 className="card-title">Registro de Personas</h5>
            <hr />
            <form onSubmit={handleSubmit} className="was-validated">
                <div className="form-group mb-3">
                    <label htmlFor="strNombre">Nombre</label>
                    <input type="text" className="form-control form-control-sm" id="strNombre" placeholder="Nombre(s)" name="strNombre"
                        value={data.strNombre}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strPrimerApellido">Primer Apellido</label>
                    <input type="text" className="form-control form-control-sm" id="strPrimerApellido" placeholder="Primer Apellido" name="strPrimerApellido"
                        value={data.strPrimerApellido}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strSegundoApellido">Segundo Apellido</label>
                    <input type="text" className="form-control form-control-sm" id="strSegundoApellido" placeholder="Segundo Apellido" name="strSegundoApellido"
                        value={data.strSegundoApellido}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strCorreo">Correo Electrónico</label>
                    <input type="email" className="form-control form-control-sm" id="strCorreo" placeholder="Correo electrónico" name="strCorreo"
                        value={data.strCorreo}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strContrasena">Contraseña</label>
                    <input type="password" className="form-control form-control-sm" id="strContrasena" placeholder="Contraseña" name="strContrasena"
                        value={data.strContrasena}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="nmbTelefono">Teléfono</label>
                    <input type="number" className="form-control form-control-sm" id="nmbTelefono" placeholder="Teléfono" name="nmbTelefono"
                        value={data.nmbTelefono}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strDireccion">Dirección</label>
                    <input type="text" className="form-control form-control-sm" id="strCorreo" placeholder="Dirección" name="strDireccion"
                        value={data.strDireccion}
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
