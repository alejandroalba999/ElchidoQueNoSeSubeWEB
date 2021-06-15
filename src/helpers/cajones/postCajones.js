export const postCajones = async (formValues) => {
    console.log(formValues)
    const url = `http://localhost:3000/api/cajon`
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    // const { cont, msg, resp, ok } = data;
    return data;

}