const net = require('net');

const clients = [];

const server = net.createServer((socket) => {
    console.log('Cliente conectado');

    clients.push(socket);

    socket.write('Bienvenido al chat TCP\n');

    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log('Mensaje:', message);

        clients.forEach(client => {
            if (client !== socket) {
                client.write(message + '\n');
            }
        });
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');

        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });

    socket.on('error', (err) => {
        console.log('Error:', err.message);
    });
});

server.listen(4000, '0.0.0.0', () => {
    console.log('Servidor TCP escuchando en puerto 12345');
});