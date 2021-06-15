import React, { useContext } from 'react'
import caleo_logo from '../../assets/images/caleo_logo.png'
import {
    Link
} from "react-router-dom";
import './styles.css'
import { UserContext } from './UserContext';

export const Login = () => {

    const { setUser } = useContext(UserContext);

    return (


        <div className="wrapper fadeInDown">
            <div id="formContent">

                <div className="fadeIn first">
                    <img src={caleo_logo} id="icon" alt="User Icon" />
                </div>


                <form>
                    <input type="text" id="login" className="fadeIn second estiloBoton" name="email" placeholder="Correo Electrónico" />
                    <input type="text" id="password" className="fadeIn third estiloBoton" name="password" placeholder="Contraseña" />
                    <Link to='/dashboard' type="submit" className="btn btn-primary fadeIn fourth mb-2 mt-2" onClick={() => setUser({
                        id: 123,
                        name: 'Nata'
                    })} >Iniciar Sesión</Link>
                </form>


                <div id="formFooter">
                    <a className="underlineHover">¿Olvidaste tu contraseña?</a>
                </div>

            </div>
        </div>





    )
}
