import controllersEscritorio from "../controllers/Escritorio.js";
import controllersTicket from "../controllers/Ticket.js";

const controllerSockets = (socket) => {
  console.log(socket.id);

  socket.on("saludar", async (mensaje, callback) => {
    controllersEscritorio.postBloqueados(mensaje.numero, (res) => {
      console.log("resPost", res);
    });
    callback("LLego el mensaje");
    socket.broadcast.emit("saluden", mensaje);
  });
  socket.on("pedir", async (num, callback) => {
    controllersEscritorio.getBloqueados(num, (res) => {
      callback(res);
    });
  });

  socket.on("formatear", async (callback) => {
    controllersEscritorio.deleteBloqueados(() => {});
  });

  socket.on("getTicket", async (callback) => {
    controllersTicket.getTicket((res) => {
      callback(res);
    });
  });

  socket.on("getAllTickets", async (callback) => {
    controllersTicket.getAllTickets((res) => {
      callback(res);
    });
  });

  socket.on("getTicketsAtendiendo", async (callback) => {
    controllersTicket.getTicketsAtendiendo((res) => {
      callback(res);
    });
  });

  socket.on("getIdEscritorio", async (numero, callback) => {
    controllersEscritorio.getIdEscritorio(numero, (res) => {
      callback(res);
    });
  });

  socket.on("getNumEscritorio", async (id, callback) => {
    controllersTicket.getNumeroEscritorio(id, (res) => {
      callback(res);
    });
  });

  /* socket.on("getEscritorioTicket", async (id, callback) => {}); */
  socket.on("getTicketInformar", (num, callback)=>{
    controllersTicket.getTicketInformar(num, (res)=>{
      callback(res)
    })
  })

  //Post
  socket.on("nuevoTicket", async (ticket, callback) => {
    controllersTicket.postTicket(ticket, (msg) => {
      callback(msg);
    });
    socket.broadcast.emit("informarTicket", ticket.numero);
  });

  //Put
  socket.on("putAtender", async (ticket, callback) => {
    controllersTicket.putAtender(ticket, (msg) => {
      callback(msg);
    });
    socket.broadcast.emit("informarAtender", ticket);
  });

  //Delete
  socket.on("deleteTicket", async (num) => {
    controllersTicket.deleteTicket(num, () => {
      return;
    });
  });
};

export default controllerSockets;
