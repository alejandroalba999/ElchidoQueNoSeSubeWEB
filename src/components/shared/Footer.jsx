import React from 'react'
import './App.css'


export const Footer = () => {
    const color = localStorage.getItem('color');
    const colorLetras = localStorage.getItem('obscuro');
    return (
        <div>
            <div class="card-footer text-muted" style={{ background: color }}>
                {/* <div><h5></h5>©Copyright</div> */}
                <div class="footer-copyright text-center " style={{ color: colorLetras == 'true' ? 'white' : 'black' }}>© {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.now())} Copyright:
                    <a href="https://www.utags.edu.mx/" target="_blank" style={{ color: 'white' }}> UTAGS.edu.mx</a>
                </div>
            </div>
        </div>
    )
}