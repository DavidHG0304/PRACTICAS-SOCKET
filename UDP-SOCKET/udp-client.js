const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const mensaje = Buffer.from('Hola servidor UDP');

client.send(mensaje, 12345, '25.xxx.xxx.xxx', (err) => {
    if (err) console.error(err);
    else console.log('Mensaje enviado');
});

client.on('message', (msg) => {
    console.log('Respuesta:', msg.toString());
    client.close();
});