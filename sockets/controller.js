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
}

export default controllerSockets