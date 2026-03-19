const dgram = require('dgram');
const readline = require('readline');

const client = dgram.createSocket('udp4');

const SERVER_IP = '192.168.1.90';
const PORT = 4000;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Escribe mensajes (UDP):");

rl.on('line', (input) => {
    const mensaje = Buffer.from(input);
    client.send(mensaje, PORT, SERVER_IP);
});

client.on('message', (msg) => {
    console.log('Respuesta del servidor:', msg.toString());
});

client.on('error', (err) => {
    console.error('Error del cliente:', err.message);
    client.close();
});