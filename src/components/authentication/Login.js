import React, { useContext, useState } from 'react'
import caleo_logo from '../../assets/images/caleo_logo.png'
import './styles.css'
import { UserContext } from './UserContext';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router';
import { Navigation } from '../authentication/navigation';

export const Login = () => {
    const history = useHistory();
    const { setUser } = useContext(UserContext);

    const initialState = {
        strCorreo: '',
        strContrasena: '',
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
            await axios.post(`http://localhost:3000/api/login/`, data)
                .then(res => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: `${res.data.usuario.strNombre} se logeo exitosamente`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    localStorage.setItem('authorization', res.data.token)
                    history.push(`/dashboard`);



                })
        } catch (error) {
            // console.log(error.response.status, 'error');
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: error.response.status == 400 ? error.response.data.err.message : 'Error en el sistema',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    return (

        <div className="wrapper fadeInDown">
            <div id="formContent">
                <Navigation />
                <div className="fadeIn first">
                    <img src={caleo_logo} id="icon" alt="User Icon" />
                </div>


                <form onSubmit={handleSubmit}>
                    <input type="email" id="strCorreo" className="fadeIn second estiloBoton" name="strCorreo" placeholder="Correo Electrónico" value={data.strCorreo}
                        onChange={handleInputChange} required />
                    <input type="password" id="strContrasena" className="fadeIn third estiloBoton" name="strContrasena" placeholder="Contraseña" value={data.strContrasena}
                        onChange={handleInputChange} required />
                    <input type="submit" id="password" className="btn btn-primary fadeIn fourth mb-2 mt-2" value="Iniciar Sesión" />

                </form>


                <div id="formFooter">
                    <a className="underlineHover">¿Olvidaste tu contraseña?</a>
                </div>

            </div>
        </div>





    )
}
