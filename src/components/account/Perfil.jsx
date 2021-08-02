import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
import './style.css';
import axios from 'axios';
import { Enviroments } from '../../enviroments/enviroments.url';
import FormData from 'form-data';
import ImageUploading from 'react-images-uploading';
import noImage from '../../assets/images/no-image.png';
export const Perfil = () => {
    const history = useHistory();
    let decoded = localStorage.getItem('authorization');
    if (localStorage.getItem("authorization")) {
        decoded = jwt_decode(localStorage.getItem("authorization"));
    } else {
        history.push('/');
    }


    const [images, setImages] = React.useState([{ data_url: `${Enviroments.urlBack}/api/imagen?ruta=personas&img=${decoded.usuario.strImg}` ? `${Enviroments.urlBack}/api/imagen?ruta=personas&img=${decoded.usuario.strImg}` : noImage }]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        if (imageList[0].file.type == 'image/jpeg' || imageList[0].file.type == 'image/png' || imageList[0].file.type == 'image/jpg') {
            Swal.fire({
                title: 'Sí deseas cambiar la imagen deberas inicar sesión nuevamente',
                text: '¿Estas seguro?',
                imageUrl: imageList[0].data_url,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: `Confirmar`,
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const formD = new FormData;
                    formD.append('archivo', imageList[0].file, imageList[0].file.name);
                    await axios.put(`${Enviroments.urlBack}/api/carga/?ruta=personas&id=${decoded.usuario._id}`, formD).then(res => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            text: res.data.msg,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setImages(imageList);
                        history.push('/auth/login');
                    }).catch(err => {
                        console.log(err);
                    })

                } else if (result.isDismissed) {
                    setImages([{ data_url: `${Enviroments.urlBack}/api/imagen?ruta=personas&img=${decoded.usuario.strImg}` ? `${Enviroments.urlBack}/api/imagen?ruta=personas&img=${decoded.usuario.strImg}` : noImage }])
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                text: 'El tipo de imagen no es admitido',
                timer: 1500
            })
        }



    };


    const [data, setData] = useState(decoded.usuario);
    const [actualizar, setActualizar] = useState(false)
    const [reload, setReload] = useState(false);


    const handleInputChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value
        });
    }


    const arrayTemas = [
        { color: '#e66465', obscuro: true },
        { color: '#3EB489', obscuro: true },
        { color: '#808080', obscuro: true },
        { color: '#212529', obscuro: true },
        { color: '#008080', obscuro: true },
        { color: '#ADD8E6', obscuro: false },
        { color: '#dc3545', obscuro: true },
        { color: '#ffff', obscuro: false },
        { color: '#06d79c', obscuro: false },
    ]
    const arrayTemasDegradado = [
        { color: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)', obscuro: true },
        { color: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)', obscuro: false },
        { color: 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)', obscuro: false },
        { color: 'radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,0.29735644257703087) 100%)', obscuro: false },
    ]


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
    const editarData = () => {
        setActualizar(true);
    }

    const actualizarData = async () => {
        try {
            Swal.fire({
                title: `¿Estas seguro de actualizar tu perfil?`,
                text: 'Se debera iniciar sesión al actualizar la informacón',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: `Actualizar`,
                reverseButtons: true
            }).then(async (res) => {
                if (res.isConfirmed) {
                    await axios.put(`${Enviroments.urlBack}/api/persona/`, data)
                        .then(res => {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                text: res.data.msg,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            localStorage.removeItem('authorization')
                            history.push('/auth/login')

                        }).catch(err => {
                            console.log(err);
                        })
                }
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
    const remover = () => {
        setData(decoded.usuario);
        setActualizar(false);
    }




    return (
        <div className="row">
            <div className="col-md-4 col-sm-12 col-lg-4">
                <div className="card shadow mt-4">
                    <div className="card-body">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="mb-3">Perfil</h3>
                                <div className="text-center mb-5">
                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageRemoveAll,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            <div>
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item">
                                                        <img id="output" src={image['data_url']} style={{ maxWidth: '80%', width: '80%', borderRadius: '20%' }} className="img-fluid" alt="..." />
                                                        <p></p>
                                                        <i class="fas fa-chevron-circle-up changeImg fa-lg" style={{ cursor: 'pointer' }} onClick={() => onImageUpdate(index)} data-bs-toggle="tooltip" data-bs-placement="end" title="Cambiar Imagen"></i>
                                                    </div>

                                                ))}

                                            </div>
                                        )}
                                    </ImageUploading>

                                </div>

                                <div className="card mb-5" >
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><strong>Nombre:</strong> <p>{data.strNombre} {data.strPrimerApellido} {data.strSegundoApellido ? data.strSegundoApellido : ''}</p> </li>
                                        <li className="list-group-item"><strong>Correo:</strong> <p>{data.strCorreo}</p></li>
                                        <li className="list-group-item"> <strong>Cuenta creada:</strong><p>{data.created_at}</p> </li>
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
                                <li className="list-group-item">Colores solidos
                                    <p>
                                        {
                                            arrayTemas.map((colores, index) => {
                                                return (
                                                    <span key={colores.color} onClick={() => cambiarColor(colores.color, colores.obscuro)} className="badge m-1" style={{ background: colores.color, cursor: 'pointer', color: colores.obscuro == false ? 'black' : 'white', border: 'solid 0.1px black' }}><i className="fas fa-tint"></i></span>
                                                )
                                            })
                                        }
                                    </p>
                                </li>
                                <li className="list-group-item">Colores con degradado
                                    <p>
                                        {
                                            arrayTemasDegradado.map((colores, index) => {
                                                return (
                                                    <span key={colores.color} onClick={() => cambiarColor(colores.color, colores.obscuro)} className="badge m-1" style={{ background: colores.color, cursor: 'pointer', color: colores.obscuro == false ? 'black' : 'white', border: 'solid 0.1px black' }}><i className="fas fa-tint"></i></span>
                                                )
                                            })
                                        }
                                    </p>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow mt-4">
                    <div className="card-body">
                        <div className="card">
                            <div className="row m-2">
                                <div className="col-11">

                                </div>
                                {
                                    actualizar &&
                                    <div className="col-1">
                                        <button type="button" onClick={() => remover()} class="btn-close" aria-label="Close"></button>
                                    </div>
                                }

                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-10 col-sm-8 col-lg-10">
                                        <h5>Datos del usuario</h5>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-lg-2">
                                        <button onClick={actualizar == false ? (e) => editarData() : (e) => actualizarData()} className="btn btn-primary btn-sm btn-block">{actualizar == false ? "Editar" : "Actualizar"}</button>
                                    </div>
                                </div>


                                <hr />
                                <form className="was-validated">
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">Nombres</span>
                                        <input type="text" className="form-control" aria-label="Sizing example input" name="strNombre" value={data.strNombre} onChange={handleInputChange} aria-describedby="inputGroup-sizing-sm" disabled={actualizar == false} />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="input-group input-group-sm mb-3">
                                                <span className="input-group-text" id="inputGroup-sizing-sm">Primer Apellido </span>
                                                <input type="text" className="form-control" aria-label="Sizing example input" name="strPrimerApellido" value={data.strPrimerApellido} onChange={handleInputChange} aria-describedby="inputGroup-sizing-sm" disabled={actualizar == false} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group input-group-sm mb-3">
                                                <span className="input-group-text" id="inputGroup-sizing-sm">Segundo Apellido</span>
                                                <input type="text" className="form-control" aria-label="Sizing example input" name="strSegundoApellido" value={data.strSegundoApellido} onChange={handleInputChange} aria-describedby="inputGroup-sizing-sm" disabled={actualizar == false} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="input-group input-group-sm mb-3">
                                                <span className="input-group-text" id="inputGroup-sizing-sm">Dirección</span>
                                                <input type="text" className="form-control" aria-label="Sizing example input" name="strDireccion" value={data.strDireccion} onChange={handleInputChange} aria-describedby="inputGroup-sizing-sm" disabled={actualizar == false} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="input-group input-group-sm mb-3">
                                                <span className="input-group-text" id="inputGroup-sizing-sm">Télefono</span>
                                                <input type="text" className="form-control" aria-label="Sizing example input" name="nmbTelefono" value={data.nmbTelefono} onChange={handleInputChange} aria-describedby="inputGroup-sizing-sm" disabled={actualizar == false} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="input-group input-group-sm mb-3">
                                                <span className="input-group-text" id="inputGroup-sizing-sm">Rol</span>
                                                <input type="text" className="form-control" aria-label="Sizing example input" name="blnAdmin" value={data.blnAdmin === true ? 'Administrador' : 'Usuario'} onChange={handleInputChange} aria-describedby="inputGroup-sizing-sm" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}






