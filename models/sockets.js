const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    // crearTicketsList
    this.ticketList = new TicketList();
    this.socketEvents();
  }
  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("conectado");

      socket.on("solicitar-ticket", (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
      });

      socket.on(
        "siguiente-ticket-trabajar",
        ({ agente, escritorio }, callback) => {
          const ticketAsignado = this.ticketList.asignarTicket(
            agente,
            escritorio
          );
          callback(ticketAsignado);
          this.io.emit("ticket-asignado", this.ticketList.ultimos13);
        }
      );

      socket.on("disconnect", () => {
        console.log("Desconectado");
      });
    });
  }
}

module.exports = Sockets;
