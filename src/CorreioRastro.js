const axios = require('axios');
const { tokenCartaoPotagem } = require('./CorreioObterTokenCartaoPostagem');


exports.rastro = async (codigoRastrio)=>{
    const API_CORREIO_URL = process.env.API_CORREIO_URL;
    const BEAR_TOKEN = await tokenCartaoPotagem()
    const dadosRastreio = await axios.get(`${API_CORREIO_URL}/srorastro/v1/objetos/${codigoRastrio}?resultado=T`,
        {
            headers: {
               'Authorization': `Bearer ${BEAR_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        if(response.status === 200){
            return response.data
        }
    }).catch((error) => {
        console.error(error)
    })

    return dadosRastreio
}

const renderResult = (data) =>{
    // const container = document.getElementById('result');

    let html = `<p><strong>Versão:</strong> ${data.versao}</p>`;
    html += `<p><strong>Quantidade:</strong> ${data.quantidade}</p>`;
    html += `<p><strong>Tipo de Resultado:</strong> ${data.tipoResultado}</p>`;

    html += '<h2>Objetos:</h2>';
    html += '<table><thead><tr><th>Código do Objeto</th><th>Mensagem</th></tr></thead><tbody>';

    data.objetos.forEach(objeto => {
      html += `<tr><td>${objeto.codObjeto}</td><td>${objeto.mensagem}</td></tr>`;
    });

    html += '</tbody></table>';

    return html
}