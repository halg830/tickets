import Escritorio from "../models/Escritorio.js";
import mongoose from "mongoose";

const controllersEscritorio = {
  getBloqueados: async (req, res) => {
    try {
      const numero = req
        const bloqueados = await Escritorio.find({numero:numero})

        if(bloqueados.length>0) res(bloqueados)
        else res([{numero: 0}])
    } catch (error) {
        console.log(error)
    }
  },

  postBloqueados: async(req, res)=>{
    try {
        const numero = req
        const escritorio = new Escritorio({numero})
        await escritorio.save()

        res(escritorio)
    } catch (error) {
        console.log(error)
        
    }
  },

  deleteBloqueados: async(res)=>{
    try {
      await Escritorio.deleteMany({});
      
    } catch (error) {
      console.log(error)
    } 
  }
};

export default controllersEscritorio