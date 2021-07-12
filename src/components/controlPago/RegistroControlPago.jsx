
import { postCajones } from '../../helpers/cajones/postCajones';
import { useForm } from '../../hooks/useForm';
import { Enviroments } from '../../enviroments/enviroments.url';
import Swal from 'sweetalert2'
export const RegistroControlPago = ({ setReload }) => {

    const [formValues, handleInputChange, reset] = useForm({
        nmbCajon: '',
        strDescripcion: '',
        blnActivo: true
    });

    const { nmbCajon, strDescripcion } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();


    }
    return (
        <div className="container">
            <h5 className="card-title">Registro de Pagos</h5>
            <hr />
            <form onSubmit={handleSubmit} className="was-validated">
                <div className="form-group mb-3">
                    <label htmlFor="number">Número del cajón</label>
                    <input type="number" className="form-control form-control-sm" id="number" placeholder="Número del cajón" name="nmbCajon"
                        value={nmbCajon}
                        onChange={handleInputChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Descripción del Cajón</label>
                    <input type="text" className="form-control form-control-sm" id="description" placeholder="Descripción del Cajón" name="strDescripcion"
                        value={strDescripcion}
                        onChange={handleInputChange} maxLength="100" required />
                </div>
                <hr />
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
