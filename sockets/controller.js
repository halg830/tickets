import controllersEscritorio from "../controllers/Escritorio.js";

const controllerSockets = (socket) => {
    console.log(socket.id);

    socket.on('saludar', async (mensaje, callback) => {
        callback( "LLego el mensaje" );
        socket.broadcast.emit( 'saluden', mensaje);
    });
    socket.on('devuelvaFecha',async(callback)=>{
        callback(new Date())
       
    })
}

export default controllerSockets