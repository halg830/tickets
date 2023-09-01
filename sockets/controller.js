import controllersEscritorio from "../controllers/Escritorio.js";

const controllerSockets = (socket) => {
    console.log(socket.id);

    socket.on('saludar', async (mensaje, callback) => {
        callback( "LLego el mensaje" );
        socket.broadcast.emit( 'saluden', mensaje);
    });
    socket.on('pedir', async(num, callback)=>{
        const bloqueado = controllersEscritorio.getBloqueados(num)
        callback(bloqueado)
    })
}

export default controllerSockets