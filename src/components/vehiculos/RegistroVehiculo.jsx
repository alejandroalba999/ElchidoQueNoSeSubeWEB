import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import './App.css'

export const RegistroVehiculo = ({ setReload }) => {

    const initialState = {
        strMarca: '',
        strModelo: '',
        nmbAño: '',
        strDescripcion: '',
        strPlacas: '',
        strColor: '#000000',
        idCajon: 0,
        idPersona: 0,
        blnActivo: true
    }

    const [data, setData] = useState(initialState);
    const [persona, setPersona] = useState([]);
    const [cajon, setCajon] = useState([]);
    const [cargar, setCargar] = useState(true)
    const handleInputChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/vehiculo`, data)
                .then(res => {
                    setReload(reload => !reload);
                    setData(initialState);
                    setCargar(false)
                    setCargar(true)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: res.data.msg,
                        showConfirmButton: false,
                        timer: 1500
                    })

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


    useEffect(() => {
        try {
            axios.get(`http://localhost:3000/api/cajon/${true}`,).then((res) => {
                console.log(res);
                const data = res.data.cont.cajon;
                setCajon(data);
            }).catch((error) => {
                console.log(error);
            })
            axios.get(`http://localhost:3000/api/persona/${true}`,)
                .then(res => {
                    const data = res.data.cont.persona
                    setPersona(data)
                })
        } catch (error) {
            console.log(error);
        }
    }, [cargar])

    const reset = () => {
        setData(initialState);
    }

    return (
        <div className="container">
            <h5 className="card-title">Registro de Vehiculos</h5>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="strMarca">Marca</label>
                            <input type="text" className="form-control" id="strMarca" placeholder="Marca vehiculo" name="strMarca"
                                value={data.strMarca}
                                onChange={handleInputChange} required />
                        </div>
                        <div className="col-6">
                            <label htmlFor="strModelo">Modelo</label>
                            <input type="text" className="form-control" id="strModelo" placeholder="Modelo vehiculo" name="strModelo"
                                value={data.strModelo}
                                onChange={handleInputChange} required />
                        </div>
                    </div>

                </div>
                <div className="form-group mb-3">
                    <label htmlFor="strDescripcion">Descripción</label>
                    {/* <input type="text"  /> */}
                    <textarea className="form-control" id="strDescripcion" placeholder="Descripción vehiculo" name="strDescripcion"
                        value={data.strDescripcion}
                        onChange={handleInputChange} required></textarea>
                </div>


                <div className="form-group mb-3">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="nmbAño">Año</label>
                            <input type="number" className="form-control" id="nmbAño" placeholder="Año vehiculo" name="nmbAño"
                                value={data.nmbAño}
                                onChange={handleInputChange} required />
                        </div>
                        <div className="col-6">
                            <label htmlFor="strPlacas">Placas</label>
                            <input type="textarea" className="form-control" id="strPlacas" placeholder="Placas vehiculo" name="strPlacas"
                                value={data.strPlacas}
                                onChange={handleInputChange} required />
                        </div>
                    </div>

                </div>


                <div className="form-group mb-3">
                    <label htmlFor="strColor">Color</label>
                    <input type="color" className="form-control" id="strColor" placeholder="Color vehiculo" name="strColor"
                        value={data.strColor}
                        onChange={handleInputChange} required />
                </div>
                {
                    cargar &&
                    <div className="form-group mb-3">
                        <label htmlFor="strPlacas">Asignar persona</label>
                        <select className="form-control" name="idPersona" onChange={handleInputChange} aria-label="Default select example" required>
                            <option value={'DEFALUT'} defaultValue={'Seleccione persona...'}>Seleccione persona ...</option>
                            {
                                persona.map(personas => {
                                    return (
                                        <option key={personas._id} value={personas._id} >{personas.strNombre} {personas.strPrimerApellido ? personas.strPrimerApellido : ''} {personas.strSegundoApellido ? personas.strSegundoApellido : ''}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                }
                {
                    cargar &&
                    <div className="form-group mb-3">
                        <label htmlFor="strPlacas">Asignar cajón</label>
                        <select className="form-control" name="idCajon" onChange={handleInputChange} aria-label="Default select example" required>
                            <option value={'DEFALUT'} defaultValue={'Seleccione cajón...'}>Seleccione cajón ...</option>
                            {
                                cajon.map(cajones => {
                                    return (
                                        <option key={cajones._id} value={cajones._id} >{cajones.nmbCajon} </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                }


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
