const controllerSockets = (socket) => {
    console.log(socket.id);

    socket.on('saludar', async (mensaje, callback) => {
        console.log(`hola ${mensaje.nombre}`);
        callback( "LLego el mensaje" );
        socket.broadcast.emit( 'saluden', `Todos aluden a ${mensaje.nombre}`);
    });
    socket.on('devuelvaFecha',async(callback)=>{
        callback(new Date())
       
    })
}

export default controllerSockets