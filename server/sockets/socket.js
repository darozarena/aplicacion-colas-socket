const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketcontrol = new TicketControl();

io.on("connection", client => {
    console.log("Usuario conectado");

    client.on("disconnect", () => {
        console.log("Usuario desconectado");
    });

    // Estado actual
    client.emit("estadoActual", {
        actual: ticketcontrol.ultimoTicket(),
        ultimos4: ticketcontrol.ultimos4Tickets()
    });

    // Escuchar el cliente
    client.on("siguienteTicket", callback => {
        let siguienteTicket = ticketcontrol.siguienteTicket();
        callback(siguienteTicket);
    });

    client.on("atenderTicket", (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: "El escritorio es necesario"
            });
        }

        let atenderTicket = ticketcontrol.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit("ultimos4", {
            ultimos4: ticketcontrol.ultimos4Tickets()
        });
    });
});