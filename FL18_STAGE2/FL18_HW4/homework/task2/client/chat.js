const connection = new WebSocket('ws://localhost:8080');
const chat = document.getElementById('chat');

const username = prompt('Enter your name:') || 'Anonymous';
document.getElementById('messageForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const messageText = this.message.value;
    if (messageText.length > 0) {
        const data = {username, message: messageText, time: new Date()};
        connection.send(JSON.stringify(data));
        document.getElementById('message').value = '';
        showMessage(data);
    }
});

connection.onmessage = function ({data}) {
    showMessage(Object.assign({}, JSON.parse(data), {role: 'receiver'}));
};
const maxSingleDigitNumber = 9, twelveHourClock = 12;
const pad = (v) => v <= maxSingleDigitNumber ? '0' + v : v;

function showMessage({username, message, time, role = 'sender'}) {
    time = new Date(time);
    chat.innerHTML += `<div class="message-container message-bubble ${
        role === 'sender' ? 'right-message-bubble' : 'left-message-bubble'}">
        <span class="message-username">${username}</span>
        <div class="message-text-content">${message}</div>
        <span class="message-time">${pad(time.getHours()) % twelveHourClock || twelveHourClock}:${pad(
        time.getMinutes()
    )}:${pad(time.getSeconds())} ${time.getHours() < twelveHourClock ? 'AM' : 'PM'}</span>
    </div>`;
    chat.scrollTop = chat.scrollHeight;
}
