import React from 'react'
import './App.css'


export const Footer = () => {
    const color = localStorage.getItem('color');
    return (
        <div>
            <div class="card-footer text-muted" style={{ background: color }}>
                {/* <div><h5></h5>©Copyright</div> */}
                <div class="footer-copyright text-center ">© 2020 Copyright:
                    <a href="https://www.utags.edu.mx/" target="_blank" style={{ color: 'white' }}> UTAGS.edu.mx</a>
                </div>
            </div>
        </div>
    )
}