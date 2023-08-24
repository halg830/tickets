const socket = io();

const txtNombre = document.querySelector('#txtNombre')
const btnIngresar = document.querySelector('#btnIngresar');
const btnDia = document.querySelector('#btnDia');

socket.on('connect', () => {
    console.log("En linea");
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

socket.on('saluden', (data) => {
    console.log(data);

});

btnIngresar.addEventListener('click', () => {
    const mensaje = {
        nombre: txtNombre.value,
    }

    socket.emit('saludar', mensaje,(msg) => {

        console.log(msg);
    });
});

btnDia.addEventListener('click', () => {
   

    socket.emit('devuelvaFecha',(msg) => {

        console.log(msg);
    });
});

function upload(files) {

}