import { useState, useEffect } from 'react'
import { getCajones, getCajonesId } from '../helpers/cajones/getCajones';

export const useFetchCajones = (reload = true) => {

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(async () => {

        await getCajones().then(cajones =>
            setState({
                data: cajones,
                cajones: cajones,
                loading: false
            })
        );

    }, [reload]);

    return state;
}

export const useFetchCajonesId = (id) => {

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {

        getCajonesId(id).then(cajones =>
            setState({
                data: cajones[0],
                cajones: cajones,
                loading: false
            })
        );

    }, [id]);

    return state;
}