import controllersEscritorio from "../controllers/Escritorio.js";

const controllerSockets = (socket) => {
    console.log(socket.id);

    socket.on('saludar', async (mensaje, callback) => {
        controllersEscritorio.postBloqueados(mensaje.numero, (res)=>{
            console.log("resPost", res)
        })
        callback( "LLego el mensaje" );
        socket.broadcast.emit( 'saluden', mensaje);
    });
    socket.on('pedir', async(num, callback)=>{
        controllersEscritorio.getBloqueados(num, (res)=>{
            callback(res)
        })
        
    })

    socket.on("formatear", async(callback)=>{
        controllersEscritorio.deleteBloqueados(()=>{
            
        })
    })

    socket.on("nuevoTicket", async(num, callback)=>{
        callback("hola")
        socket.broadcast.emit("informarTicket", num)
    })
}

export default controllerSockets