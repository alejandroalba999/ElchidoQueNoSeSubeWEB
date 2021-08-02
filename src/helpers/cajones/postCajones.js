import { Enviroments } from "../../enviroments/enviroments.url";

export const postCajones = async (formValues) => {
    const url = `${Enviroments.urlBack}/api/cajon`
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;

}