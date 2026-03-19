const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const PORT = 4000;

let mensajesPorSegundo = 0;

const LIMITE = 5;

setInterval(() => {
    mensajesPorSegundo = 0;
}, 1000);

server.on('message', (msg, rinfo) => {
    const mensaje = msg.toString();
    mensajesPorSegundo++;

    if (mensajesPorSegundo > LIMITE) {
        console.log(`Mensaje perdido por congestión de ${rinfo.address}:${rinfo.port}`);
        return;
    }

    console.log(`Mensaje recibido: "${mensaje}" de ${rinfo.address}:${rinfo.port}`);

    const respuesta = Buffer.from(`OK: ${mensaje}`);
    server.send(respuesta, rinfo.port, rinfo.address);
});

server.on('listening', () => {
    console.log(`Servidor UDP escuchando en puerto ${PORT}`);
});

server.on('error', (err) => {
    console.error('Error del servidor:', err.message);
    server.close();
});

server.bind(PORT, '0.0.0.0');