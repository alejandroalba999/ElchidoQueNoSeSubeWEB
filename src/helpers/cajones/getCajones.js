export const getCajones = async () => {

    const url = `http://localhost:3000/api/cajon`
    const respuesta = await fetch(url);
    const { cont } = await respuesta.json();

    const { cajon } = cont;

    const cajones = cajon.map(cajones => {
        return {
            _id: cajones._id,
            nmbCajon: cajones.nmbCajon,
            strDescripcion: cajones.strDescripcion,
            blnRentado: cajones.blnRentado,
            blnActivo: cajones.blnActivo
        }
    })

    return cajones;

}

export const getCajonesId = async (id) => {

    const url = `http://localhost:3000/api/cajon/obtenerId/${id}`
    const respuesta = await fetch(url);
    console.log(respuesta)
    const { cont } = await respuesta.json();

    const { cajon } = cont;

    const cajones = cajon.map(cajones => {
        return {
            _id: cajones._id,
            nmbCajon: cajones.nmbCajon,
            strDescripcion: cajones.strDescripcion,
            blnActivo: cajones.blnActivo
        }
    })

    return cajones;

}
