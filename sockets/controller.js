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
    controllersTicket.getTicket((res)=>{
        callback(res);
    })
  });

  socket.on("getAllTickets", async(callback)=>{
    controllersTicket.getAllTickets((res)=>{
      callback(res)
    })
  })

  socket.on("getTicketsAtendiendo", async(callback)=>{
    controllersTicket.getTicketsAtendiendo((res)=>{
      callback(res)
    })
  })

  //Post
  socket.on("nuevoTicket", async (ticket, callback) => {
    controllersTicket.postTicket(ticket, (msg)=>{
        callback(msg);
    })
    socket.broadcast.emit("informarTicket", ticket.numero);
  });

  //Put
  socket.on("putAtender", async(num, callback)=>{
    controllersTicket.putAtender(num, (msg)=>{
      callback(msg)
    })
    socket.broadcast.emit("informarAtender", num)
  })

  //Delete
  socket.on("deleteTicket", async(num)=>{
    controllersTicket.deleteTicket(num)
  })
};

export default controllerSockets;
