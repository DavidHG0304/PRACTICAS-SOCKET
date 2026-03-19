const net = require('net');

const clients = [];

const server = net.createServer((socket) => {
    console.log('Cliente conectado');

    clients.push(socket);

    socket.write('Bienvenido al chat TCP\n');

    socket.on('data', (data) => {
        const message = data.toString();
        console.log('Mensaje:', message);

        // reenviar a todos
        clients.forEach(client => {
            if (client !== socket) {
                client.write(message);
            }
        });
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(12345, '0.0.0.0', () => {
    console.log('Servidor escuchando en puerto 12345');
});
