document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let currentUser;

    do {
        currentUser = prompt('Enter your username:');
    } while (!currentUser);

    const sendMessage = () => {
        const msgInput = document.getElementById('message-input');
        const msg = msgInput.value.trim();
        console.log(msg);

        if (msg !== ''){
            const message = {
                sender: currentUser,
                content: msg,
            }

            socket.emit('chat message', message);
            msgInput.value = '';
        }

    }

    document.getElementById('send-button').addEventListener('click', (event) => {
        event.preventDefault();
        sendMessage();
        return false;
    });

    // Listen to Enter key press
    document.getElementById('message-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter'){
            event.preventDefault();
            sendMessage();
        }
    });

    socket.on('chat message', (msg) => {
        const messagesList = document.getElementById('messages');
        const li = document.createElement('li');
        li.textContent = `${msg.sender}: ${msg.content}`;
        messagesList.appendChild(li);
    });

});