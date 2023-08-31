import Escritorio from "../models/Escritorio.js";

const controllersEscritorio = {
  getBloqueados: async (req, res) => {
    try {
        const {numero} = req.body
        const bloqueados = await Data.find(s=> s.bloqueados==numero)

        res.json({bloqueados})
    } catch (error) {
        console.log(error)
    }
  },

  postBloqueados: async(req, res)=>{
    try {
        const {numero} = req.body
        const escritorio = new Escritorio({numero})
        await escritorio.save()

        res.json({escritorio})
    } catch (error) {
        console.log(error)
        
    }
  }
};

export default controllersEscritorio