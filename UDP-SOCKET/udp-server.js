const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log(`Mensaje de ${rinfo.address}: ${msg}`);

    server.send('Recibido', rinfo.port, rinfo.address);
});

server.bind(12345, () => {
    console.log('Servidor UDP escuchando en puerto 12345');
});