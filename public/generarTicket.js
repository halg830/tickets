const socket = io();

const txtNumero = document.querySelector("#numero");
const btnGenerar = document.querySelector("#btnGenerar");
let ticket = 0;

socket.on("connect", () => {
  console.log("En linea");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

socket.emit("getTicket", async (res) => {
  if (res) {
    const { numero } = await res;
    console.log("numero", numero);
    ticket = numero;
    txtNumero.textContent = ticket;
  }

  return;
});

btnGenerar.addEventListener("click", () => {
  ticket += 1;

  const nuevoTicket = {
    numero: ticket,
    estado: "pendiente",
  };
  txtNumero.textContent = ticket;

  socket.emit("nuevoTicket", nuevoTicket, (msg) => {
    console.log(msg);
  });
});

socket.on("informarTicket", (num) => {
  ticket = num;
  txtNumero.textContent = ticket;
});
