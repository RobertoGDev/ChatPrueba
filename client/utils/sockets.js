import { getdateformat } from './functions.js';

function openSockets(usergenerated, infopanel, panel) {
    const socket = new WebSocket('ws://localhost:3001');
    socket.addEventListener('open', (e) => initSocket(e, usergenerated, socket, infopanel));
    socket.addEventListener('message', (e) => onMessage(e, panel));
    socket.addEventListener('close', (e) => closeSocket(e, usergenerated, socket));
    return socket;
}

function isOpen(ws) {
    return ws.readyState === ws.OPEN;
}

function initSocket(e, usergenerated, socket, info) {
    e.preventDefault();
    info.innerHTML = `<p>${usergenerated} ya puedes enviar mensajes!<p>`;
    socket.send(
        JSON.stringify({
            type: 'CNT',
            id_usuario: usergenerated,
            time: getdateformat()
        })
    );
}

function onMessage(e, panel) {
    panel.innerHTML += `${e.data}`;
}

function submitMsg(e, socket, inputMessage, usergenerated, coloruser) {
    e.preventDefault();
    const value = inputMessage.value;

    if (!isOpen(socket)) return;

    socket.send(
        JSON.stringify({
            type: 'MSG',
            payload: value,
            color: coloruser,
            id_usuario: usergenerated,
            time: getdateformat()
        })
    );

    inputMessage.value = '';
}

function closeSocket(e, usergenerated, socket) {
    socket.send(
        JSON.stringify({
            type: 'DSC',
            id_usuario: usergenerated,
            time: getdateformat()
        })
    );
}

export { openSockets, submitMsg };