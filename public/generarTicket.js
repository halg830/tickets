const socket = io();

const txtNumero = document.querySelector("#numero")
const btnGenerar = document.querySelector("#btnGenerar");
let numero = localStorage.getItem("ticket") ?? 0

socket.on("connect", () => {
  console.log("En linea");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

btnGenerar.addEventListener("click", () => {
    numero=parseInt(numero)+1
  localStorage.setItem("ticket", numero);
  txtNumero.textContent=numero

  console.log("hola2")
  socket.emit("nuevoTicket", numero,(msg)=>{
    
  })
});

socket.on("informarTicket", (num)=>{
  numero=num
})
