import React, { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';



export const Perfil = () => {
    const arrayTemas = [
        { color: '#0d6efd', obscuro: true },
        { color: '#198754', obscuro: true },
        { color: '#00CED1', obscuro: false },
        { color: '#ADD8E6', obscuro: false },
        { color: '#212529', obscuro: true },
        { color: '#ffc107', obscuro: false },
        { color: '#808080', obscuro: true },
        { color: '#ffff', obscuro: false }]
    let decoded = localStorage.getItem('authorization');
    if (localStorage.getItem("authorization")) {
        decoded = jwt_decode(localStorage.getItem("authorization"));
    } else {
        history.push('/');
    }
    const history = useHistory();
    const cambiarColor = (color, obscuro) => {
        Swal.fire({
            title: 'Sí deseas cambiar el tema deberas inicar sesión nuevamente',
            text: `¿Estas seguro?`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: `Confirmar`,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('color', color);
                localStorage.setItem('obscuro', obscuro);
                window.location.href = '/'
            }
        })
    }
    useEffect(() => {

    }, [])

    return (
        <div className="row">
            <div className="col-md-4 col-sm-12 col-lg-4">
                <div className="card shadow mt-4">
                    <div className="card-body">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="mb-3">Perfil</h3>
                                <div className="text-center mb-5">
                                    <img src={`http://localhost:3000/api/imagen?ruta=personas&img=${decoded.usuario.strImg}`} style={{ maxWidth: '220px', borderRadius: '20%' }} className="img-fluid" alt="..." />
                                </div>

                                <div className="card mb-5" >
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><strong>Nombre:</strong> <p>Edgar Alejandro Alba Pérez</p> </li>
                                        <li className="list-group-item"><strong>Correo:</strong> <p>alejandroalba@gmail.com</p></li>
                                        <li className="list-group-item"> <strong>Cuenta creada:</strong><p>12/Febrero/2021</p> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8 col-sm-12 col-lg-8">
                <div className="card shadow mt-4">
                    <div className="card-body">
                        <div className="card">
                            <div className="card-body">
                                <h3>Información General</h3>
                                <hr />
                                <h5>Cambiar Tema</h5>
                                {
                                    arrayTemas.map((colores) => {
                                        return (
                                            <span key={colores.color} onClick={() => cambiarColor(colores.color, colores.obscuro)} className="badge m-1" style={{ background: colores.color, cursor: 'pointer', color: colores.obscuro == false ? 'black' : 'white', border: 'solid 0.1px' }}><i className="fas fa-tint"></i></span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow mt-4">
                    <div className="card-body">
                        <div className="card">
                            <div className="card-body">
                                <h5>Datos del usuario</h5>
                                <hr />
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Nombres</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input" value="Edgar Alejandro" aria-describedby="inputGroup-sizing-sm" />
                                </div>
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Apellidos </span>
                                    <input type="text" className="form-control" aria-label="Sizing example input" value="Alba Pérez" aria-describedby="inputGroup-sizing-sm" />
                                </div>
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Dirección</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input" value="Sierra del tigre #126" aria-describedby="inputGroup-sizing-sm" />
                                </div>
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Télefono</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input" value="4492904113" aria-describedby="inputGroup-sizing-sm" />
                                </div>
                                <div className="input-group input-group-sm mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Rol</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input" value="Administrador" aria-describedby="inputGroup-sizing-sm" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}






