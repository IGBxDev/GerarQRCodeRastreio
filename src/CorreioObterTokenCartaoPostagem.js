const axios = require('axios');

exports.tokenCartaoPotagem = async ()=>{
    const API_CORREIO_USERNAME = process.env.API_CORREIO_USERNAME;
    const API_CORREIO_PASSWORD = process.env.API_CORREIO_PASSWORD;
    const API_CORREIO_URL = process.env.API_CORREIO_URL;
    const API_CORREIO_NUMERO= process.env.API_CORREIO_NUMERO;

    const token = await axios.post(`${API_CORREIO_URL}/token/v1/autentica/cartaopostagem`, { numero: API_CORREIO_NUMERO },
        {
            auth: {
                username: API_CORREIO_USERNAME,
                password: API_CORREIO_PASSWORD
            }
        }
    ).then((response) => {
        if(response.status === 201){
            return response.data.token
        }
    }).catch((error) => {
        console.error(error);
        return error
    })

    return token
}