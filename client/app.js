import { randomColor } from './utils/functions.js';
import { openSockets, submitMsg } from './utils/sockets.js';

let usergenerated = '';
let coloruser = '';
let socket = [];

const formID = document.getElementById('form_getId');
const inputID = document.getElementById('userInput');
const buttonUser = document.querySelector('#form_getId .btn');
const chat = document.getElementById('chat');
const infopanel = document.getElementById('info');
const panel = document.getElementById('messagepanel');
const inputMessage = document.getElementById('message');
const formChat = document.getElementById('form_msg');

inputID.addEventListener('input', () => {
    buttonUser.classList.toggle('disabled', inputID.value === '');
});

const customUser = (e) => {
    e.preventDefault();
    formID.style.display = 'none';
    chat.style.display = 'block';
    usergenerated = inputID.value;
    coloruser = randomColor();
    socket = openSockets(usergenerated, infopanel, panel);
};

formID.addEventListener('submit', customUser);
formChat.addEventListener('submit', (e) => submitMsg(e, socket, inputMessage, usergenerated, coloruser));