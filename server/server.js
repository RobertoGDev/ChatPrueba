const ws = require("ws");
const wsServer = new ws.Server({ port: 3000 });

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
        return wsServer.broadcast(`<p style="color:green"><span>${msg.time}</span> | <span style="font-weight:bold">${msg.id_usuario}</span> se ha desconectado`);
      case "DSC":
        return wsServer.broadcast(`<p style="color:red"><span>${msg.time}</span> | <span style="font-weight:bold">${msg.id_usuario}</span> se ha desconectado`);
      case "MSG":
        return wsServer.broadcast(`<p style="color:blue"><span>${msg.time}</span> | <span style="font-weight:bold">${msg.id_usuario} : </span>${msg.payload}<p>`);
      default:
        return console.log("NO EVENT MATCHING");
    }
  });
});