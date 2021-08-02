import React, { useState } from 'react'
import { useHistory } from 'react-router';
export const Navigation = () => {
    const history = useHistory();
    let activoLogin = [true, false];
    if (window.location.pathname == '/auth/register') {
        activoLogin = [false, true];
    } else {
        activoLogin = [true, false];
    }
    const [badge, setbadge] = useState([{ nombre: 'Login', blnActivo: true, Login: true, active: activoLogin[0] }, { nombre: 'Registro', blnActivo: false, Login: false, active: activoLogin[1] }])

    const navigate = (Login) => {
        if (Login == true) {
            history.push('/auth/login');
            setbadge([{ nombre: 'Login', blnActivo: true, Login: true, active: true }, { nombre: 'Registro', blnActivo: false, Login: false, active: false }])
        } else {
            history.push('/auth/register');
            setbadge([{ nombre: 'Login', blnActivo: true, Login: true, active: false }, { nombre: 'Registro', blnActivo: false, Login: false, active: true }])
        }
    }

    return (
        <div>
            <h6>
                {
                    badge.map(res => {
                        return (
                            <span onClick={() => navigate(res.Login)} key={res.nombre} style={{ cursor: 'pointer' }} className={res.active == true ? "badge bg-secondary mb-2 mt-3" : "badge bg-light text-dark mb-2 mt-3"}>{res.nombre}</span>
                        )
                    })
                }
            </h6>
            <hr />
        </div>
    )
}
