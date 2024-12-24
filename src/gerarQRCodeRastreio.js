const QRCode = require('qrcode');

// Função para gerar QR Code
const generateQRCode = async (trackingNumber) => {
  try {
    // Texto ou URL que será codificado
    const data = `https://example.com/track?number=${trackingNumber}`;

    // Gerar o QR Code como um Data URI (imagem base64)
    const qrCodeDataUri = await QRCode.toDataURL(data);

    // Imprimir a imagem base64 no console
    console.log('QR Code gerado com sucesso!');
    console.log(qrCodeDataUri);

    // Você pode salvar a imagem ou utilizá-la em um HTML
  } catch (error) {
    console.error('Erro ao gerar o QR Code:', error);
  }
};

// Exemplo de número de rastreio
const trackingNumber = 'AB123456789BR';
generateQRCode(trackingNumber);
