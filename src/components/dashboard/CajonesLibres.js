import React from 'react'
import { useHistory } from 'react-router';
import { useFetchCajones } from '../../hooks/useFetchCajones.js'
import './Style.css';

export const CajonesLibres = () => {

    const { data } = useFetchCajones();

    const history = useHistory();


    return (

        <div>
            <div className="card shadow mt-4 ex1">
                <div className="card-body ">

                    {(data.length <= 0) ? <div className="alert alert-primary" role="alert">
                        No hay cajones para mostrar :(</div> : null}

                    <div className="row tableFixHead">

                        {
                            data.map(cajon => {
                                return (

                                    < div className=" col-md-4 col-sm-12 col-xs-12  mb-3 " key={cajon._id}>
                                        <div className="card shadow ">
                                            <div className="card-header ">

                                                {
                                                    (cajon.blnActivo === false) ? <h5 style={{ color: 'red' }}>No disponible</h5>
                                                        :
                                                        <h5 style={{ color: cajon.blnRentado == true ? 'red' : 'green' }}>{cajon.blnRentado == true ? 'Rentado' : 'Disponible'}</h5>

                                                }

                                            </div>
                                            <div className="card-body "  >
                                                <h5 className="card-title">Número de cajon: <strong>{cajon.nmbCajon}</strong> </h5>
                                                <p className="card-text">{cajon.strDescripcion}</p>

                                                <button className="btn btn-primary block" disabled={!cajon.blnActivo || cajon.blnRentado} onClick={() => history.push(`/rentar/${cajon._id}`)}>Rentar</button>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div >

    )
}
