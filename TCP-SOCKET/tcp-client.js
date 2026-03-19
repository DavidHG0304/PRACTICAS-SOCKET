const net = require('net');
const readline = require('readline');

const client = net.createConnection({
    host: '25.xxx.xxx.xxx',
    port: 12345
}, () => {
    console.log('Conectado al servidor');
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    client.write(input);
});

client.on('data', (data) => {
    console.log('Mensaje recibido:', data.toString());
});

client.on('end', () => {
    console.log('Desconectado del servidor');
});