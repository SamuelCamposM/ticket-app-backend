const { v4 } = require("uuid");

class Ticket {
  constructor(numero) { 
    this.id = v4();
    this.numero = numero;
    this.escritorio = null;
    this.agente = null;
  }
}

module.exports = Ticket;
