const express = require('express')
const path = require('path');
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors')
const bodyParser = require('body-parser')
 const { rastro } = require('./CorreioRastro')
// const { tokenCartaoPotagem } = require('./CorreioObterTokenCartaoPostagem')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: '*', credentials: true }))

app.use(express.static(path.join(__dirname, 'public')));

// Proxy para os Correios
app.use('/api/correios', createProxyMiddleware({
  target: 'https://apihom.correios.com.br',
  changeOrigin: true,
  pathRewrite: {
    '^/api/correios': '', // Remove '/api/correios' do caminho
  },
}));



app.get('/gerar-qrcode', async (req, res) =>{
    const QRCode = require('qrcode');
    const { codigoRastreio } = req.body;

    if (!codigoRastreio) {
      return res.status(400).send('Número de rastreio é obrigatório');
    }
  
    try {
      // const BEAR_TOKEN = await tokenCartaoPotagem()
      const dadosRatreio = await rastro(codigoRastreio)
      // console.log("dadosRatreio", dadosRatreio)
      const API_BACKEND_URL = process.env.API_BACKEND_URL;
      const data = `${API_BACKEND_URL}/resultado.html?data=${JSON.stringify(dadosRatreio)}`;
      const qrCodeDataUri = await QRCode.toDataURL(data);
  
      // Retornar o QR Code como uma imagem
      const base64Data = qrCodeDataUri.replace(/^data:image\/png;base64,/, '');
      const imgBuffer = Buffer.from(base64Data, 'base64');
  
      res.setHeader('Content-Type', 'image/png');
      res.send(imgBuffer);
    } catch (error) {
      res.status(500).send('Erro ao gerar o QR Code');
    }
});


module.exports = app;
