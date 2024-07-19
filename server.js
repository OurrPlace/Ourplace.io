const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let canvasState = []; // Array to store canvas state

wss.on('connection', (ws) => {
    // Send current canvas state to newly connected client
    ws.send(JSON.stringify(canvasState));

    ws.on('message', (message) => {
        const { x, y, color } = JSON.parse(message);
        updateCanvasState(x, y, color);
        broadcastCanvasState();
    });
});

function updateCanvasState(x, y, color) {
    // Update pixel at position (x, y) with specified color
    canvasState.push({ x, y, color });
}

function broadcastCanvasState() {
    // Broadcast updated canvas state to all connected clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(canvasState));
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
