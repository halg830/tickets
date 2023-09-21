import Ticket from "../models/tickets.js";

const controllersTicket = {
  getTicket: async (res) => {
    try {
      const ticket = await Ticket.find()
        .sort({ _id: -1 })
        .limit(1)
        .then((tickets) => {
          if (tickets.length > 0) {
            const ultimo = tickets[0];
            return ultimo;
          } else {
            return undefined
          }
        });

      res(ticket);
    } catch (error) {
      console.log(error);
    }
  },

  getAllTickets: async(res)=>{
    try {
        const tickets = await Ticket.find({estado:"pendiente"})

        res(tickets)
    } catch (error) {
        console.log(error)
    }
  },

  getTicketsAtendiendo: async(res)=>{
    try {
      const tickets = await Ticket.find({estado: "atendiendo"})
      res(tickets)
    } catch (error) {
      console.log(error);
    }
  },

  postTicket: async (req, res) => {
    try {
        const estados=["pendiente", "atendiendo", "finalizado"]
        const {numero, estado} = req

        if(!estados.includes(estado)){
            res("Estado no valido")
            return
        }

        const ticket = new Ticket({numero, estado})
        await ticket.save()

        res("Guardado")
    } catch (error) {
      console.log(error);
    }
  },

  putAtender: async(req, res)=>{
    const {numero, escritorio} = req
    await Ticket.updateOne({numero},{estado:"atendiendo", escritorio}, {new:true})
    res("Actualizado")
  },

  putFinalizado: async()=>{

  },

  deleteTicket: async(req)=>{
    try {
      const numero = req
        await Ticket.deleteOne({numero})
    } catch (error) {
        console.log(error)
    }
  }
};

export default controllersTicket