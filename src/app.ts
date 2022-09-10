import express from 'express';
import { resolve } from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();

export const server = createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'index.html'));
});

io.on('connection', (client) => {
    console.log('someone got connected...', client.id);

    client.on('message', (payload) => {
        client.broadcast.emit('message', payload);
    });
});
