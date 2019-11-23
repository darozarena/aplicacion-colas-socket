var socket = io();
var label = $("#lblNuevoTicket");

socket.on("connect", () => {
    console.log("Conectado al servidor");
});

socket.on("disconnect", () => {
    console.log("Desconectado del servidor");
});

socket.on("estadoActual", estadoActual => {
    label.text(estadoActual.actual);
});

$("button").on("click", () => {
    socket.emit("siguienteTicket", resp => {
        console.log(resp);
        label.text(resp);
    });
});