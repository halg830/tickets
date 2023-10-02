import Ticket from "../models/tickets.js";
import Escritorio from "../models/Escritorio.js";
import mongoose from "mongoose";

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
      console.log(tickets);
      res(tickets)
    } catch (error) {
      console.log(error);
    }
  },
  
  getNumeroEscritorio: async (req, res) => {
    try {
      const id = req
      // const id = new mongoose.Types.ObjectId(req);
      const ticket = await Ticket.findById(id).populate("escritorio").exec()
      console.log("ticke",ticket)

      res(ticket)
    } catch (error) {
      console.log(error);
    }
  },

  getTicketInformar: async(req, res)=>{
    try {
      const numero = req
      const ticket = await Ticket.findOne({numero})
      console.log(ticket);
      res(ticket)
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
    console.log(req)
    const {numero, escritorio} = req
    await Ticket.updateOne({numero},{estado:"atendiendo", escritorio}, {new:true})

    const atendido = await Ticket.find({estado:"atendiendo"})
    res(atendido)
  },

  putFinalizado: async()=>{

  },

  deleteTicket: async(req)=>{
    try {
      const numero = req
        await Ticket.deleteOne({numero})
        return
    } catch (error) {
        console.log(error)
    }
  }
};

export default controllersTicket