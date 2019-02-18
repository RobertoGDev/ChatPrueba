const ws = require("ws");
const wsServer = new ws.Server({
    port: 3001
});

wsServer.broadcast = function broadcast(data) {
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
            client.send(data);
        }
    });
};

wsServer.on("connection", socket => {
    console.log("Nuevo cliente!");


    socket.on("message", data => {
        const msg = JSON.parse(data);


        switch (msg.type) {
            case "CNT":
                return wsServer.broadcast(`<div class="green-text text-darken-2"><small><span>${msg.time}</span> | <span style="font-weight:bold">${msg.id_usuario}</span> se ha conectado</small></div>`);
            case "DSC":
                return wsServer.broadcast(`<div class="red-text text-darken-2"><small><span>${msg.time}</span> | <span style="font-weight:bold">${msg.id_usuario}</span> se ha desconectado</small></div>`);
            case "MSG":
                return wsServer.broadcast(`<div class="card-panel p5 blue lighten-5" style="color:${msg.color}; padding: 5px"><span>${msg.time}</span> | <span style="font-weight:bold">${msg.id_usuario} : </span>${msg.payload}</div>`);
            default:
                return console.log("NO EVENT MATCHING");
        }
    });
});