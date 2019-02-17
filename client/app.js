// let usergenerated = randomUser();
let usergenerated = "";
socket = []; 

const selectId = document.getElementById('selectId');
const formID = document.getElementById('form_getId');
const inputID = document.getElementById('idUserCustom');


const chat = document.getElementById('chat');
const infopanel = document.getElementById('info');
const panel = document.getElementById('messagepanel');
const inputMessage = document.getElementById('message');
const formChat = document.getElementById('form_msg');


function openSockets() {
    const socket = new WebSocket('ws://localhost:3000');
    socket.addEventListener('open', initSocket);
    socket.addEventListener('message', onMessage);
    socket.addEventListener('close', closeSocket);
    return socket;
}

function getdateformat() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function customUser(e) {
    e.preventDefault();
    formID.style.display = "none";
    chat.style.display = "block";
    usergenerated = inputID.value;
    socket = openSockets();
    
}

function randomUser() {
    let usergenerated = "";
    let charsC = 'bcdfghjklmnpqrstvwxyz';
    let charsV = 'aeiou';
    let charsD = '1234567890';
    usergenerated += charsC.charAt(Math.floor(Math.random() * charsC.length));
    usergenerated += charsV.charAt(Math.floor(Math.random() * charsV.length));
    usergenerated += charsC.charAt(Math.floor(Math.random() * charsC.length));
    usergenerated += charsV.charAt(Math.floor(Math.random() * charsV.length));
    usergenerated += charsD.charAt(Math.floor(Math.random() * charsD.length));
    usergenerated += charsD.charAt(Math.floor(Math.random() * charsD.length));
    usergenerated += charsD.charAt(Math.floor(Math.random() * charsD.length));
    return usergenerated;
}

function isOpen(ws) {
    return ws.readyState === ws.OPEN
}

function initSocket(e) {
    info.innerHTML = `<p>Su id de usuario es: ${usergenerated} <p>`;
    socket.send(JSON.stringify({
        type: 'CNT',
        id_usuario: usergenerated,
        time: getdateformat()
    }))
}

function onMessage(e) {
    panel.innerHTML += `${e.data}`;
}

function submitMsg(e) {
    e.preventDefault();
    const value = inputMessage.value;

    if (!isOpen(socket)) return;

    socket.send(JSON.stringify({
        type: 'MSG',
        payload: value,
        id_usuario: usergenerated,
        time: getdateformat()
    }))

    inputMessage.value = "";
}

function closeSocket(e) {
    socket.send(JSON.stringify({
        type: 'DSC',
        id_usuario: usergenerated,
        time: getdateformat()
    }))
}

formID.addEventListener('submit', customUser);
formChat.addEventListener('submit', submitMsg);