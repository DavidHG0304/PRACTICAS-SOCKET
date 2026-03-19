const net = require('net');
const readline = require('readline');

const HOST = '192.168.1.90'; // CAMBIA por la IP del servidor
const PORT = 4000;

let client;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startClient() {
    client = net.createConnection({ host: HOST, port: PORT }, () => {
        console.log('Conectado al servidor');
    });

    client.on('data', (data) => {
        console.log('Mensaje:', data.toString());
    });

    client.on('end', () => {
        console.log('Desconectado del servidor');
    });

    client.on('close', () => {
        console.log('Intentando reconectar en 3 segundos...');
        setTimeout(startClient, 3000);
    });

    client.on('error', (err) => {
        console.log('Error:', err.message);
    });
}

rl.on('line', (input) => {
    if (client) {
        client.write(input);
    }
});

startClient();