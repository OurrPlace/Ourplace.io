const socket = new WebSocket('ws://localhost:3000');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
let currentColor = '#FFFFFF';

function setColor(color) {
    currentColor = color;
}

canvas.addEventListener('mousedown', function(event) {
    canvas.addEventListener('mousemove', paint);
    paint(event);
});

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', paint);
});

function paint(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / 10); // Adjust pixel size as needed
    const y = Math.floor((event.clientY - rect.top) / 10); // Adjust pixel size as needed

    ctx.fillStyle = currentColor;
    ctx.fillRect(x * 10, y * 10, 10, 10); // Adjust pixel size as needed

    // Send pixel update to server via WebSocket
    socket.send(JSON.stringify({ x, y, color: currentColor }));
}
