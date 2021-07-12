import React from 'react'
import './App.css'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router';

export const Footer = () => {
    const history = useHistory();
    let decoded = localStorage.getItem('authorization');
    if (localStorage.getItem("authorization")) {
        decoded = jwt_decode(localStorage.getItem("authorization"));
    } else {
        history.push('/');
    }
    const color = localStorage.getItem('color');
    const colorLetras = localStorage.getItem('obscuro');
    return (
        <div>
            <div class="card-footer text-muted" style={{ background: color }}>
                <div class="footer-copyright text-center " style={{ color: colorLetras == 'true' ? 'white' : 'black' }}>© {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.now())} Copyright:
                    <a href="https://www.utags.edu.mx/" target="_blank" style={{ color: colorLetras == 'true' ? 'white' : 'black' }}> UTAGS.edu.mx</a>
                    <a target="_blank" style={{ color: colorLetras == 'true' ? 'white' : 'black', paddingLeft: '50%' }}>{decoded.usuario.strCorreo}</a>
                </div>
            </div>
        </div>
    )
}