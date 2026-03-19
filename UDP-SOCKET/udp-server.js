const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const PORT = 4000;

server.on('message', (msg, rinfo) => {
    const mensaje = msg.toString();

    // 🔴 Simulación de pérdida de paquetes (30%)
    if (Math.random() < 0.3) {
        console.log(`Mensaje perdido de ${rinfo.address}:${rinfo.port}`);
        return;
    }

    console.log(`Mensaje recibido: "${mensaje}" de ${rinfo.address}:${rinfo.port}`);

    // respuesta al cliente
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

// 🔥 importante para red local / hamachi
server.bind(PORT, '0.0.0.0');