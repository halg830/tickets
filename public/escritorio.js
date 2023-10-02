const socket = io();

const txtNumero = document.querySelector("#numeroEscritorio");
const div = document.querySelector("#contNumeros");
const btnAtender = document.querySelector("#buto");
const txtAtendiendo = document.querySelector("#txtAtendiendo");

const numero = sessionStorage.getItem("numero");

txtNumero.textContent = numero;

let tickets = [];
let id = "";

document.addEventListener("DOMContentLoaded", () => {
  txtAtendiendo.textContent = sessionStorage.getItem("ticketAtendiendo");
});

socket.emit("getIdEscritorio", numero, (res) => {
  console.log("res", res);
  id = res._id;
});

socket.on("connect", () => {
  console.log("En linea");
});

socket.emit("getAllTickets", (res) => {
  console.log(res);
  res.forEach((n) => {
    tickets.push(n);
  });

  actualizarNumeros();

  if (tickets.length <= 0) msgTicketsVacios();
});

socket.on("informarTicket", async(num) => {
  const ticket = await new Promise((resolve) => {
    socket.emit("getTicketInformar", num, async (res) => {
      const ticket = await res;
      resolve(ticket);
    });
  });

  tickets.push(ticket);
  actualizarNumeros();
});

socket.on("informarAtender", (num) => {
  console.log("num", num);
  const index = tickets.findIndex((n) => n.numero === num.numero);
  console.log(index);
  if (index == -1) return;

  tickets.splice(index, 1);
  actualizarNumeros();
});

btnAtender.addEventListener("click", () => {
  if (tickets.length <= 0) {
    msgTicketsVacios();
    return;
  }

  let ticketAtendiendo = tickets.splice(0, 1);
  ticketAtendiendo = { ...ticketAtendiendo[0], escritorio: id };

  console.log(ticketAtendiendo);

  socket.emit("putAtender", ticketAtendiendo, (res) => {
    console.log(res);
  });

  sessionStorage.setItem("ticketAtendiendo", ticketAtendiendo.numero);
  txtAtendiendo.textContent = sessionStorage.getItem("ticketAtendiendo");
  actualizarNumeros();
});

function actualizarNumeros() {
  div.innerHTML = "";
  let fragment = document.createDocumentFragment();

  tickets.forEach((n) => {
    const h1 = document.createElement("h1");

    h1.textContent = n.numero;
    h1.setAttribute("class", "numCola");
    fragment.appendChild(h1);
  });
  div.appendChild(fragment);
}

function msgTicketsVacios() {
  if (!(tickets <= 0 && div.children.length == 0)) return;

  if (sessionStorage.getItem("ticketAtendiendo") == "")
    txtAtendiendo.textContent = "Esperando ticket";

  const txtTicketsVacio = document.createElement("p");
  txtTicketsVacio.textContent = "No se han generado tickets";
  div.appendChild(txtTicketsVacio);
}
