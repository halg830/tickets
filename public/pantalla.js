const socket = io();

const div = document.querySelector("#contNumeros");
let tickets = [];

socket.on("connect", () => {
  console.log("En linea");
});

socket.emit("getTicketsAtendiendo", async (res) => {
  console.log("1",res);
  const ticketPromesas = res.map((ticketId)=>{
    return new Promise((resolve)=>{
      socket.emit("getNumEscritorio", ticketId, async(res)=>{
        const ticket = await res
        resolve(ticket)
      })
    })
  })

  const ticketResultados = await Promise.all(ticketPromesas)
  ticketResultados.sort((a,b)=>b.numero-a.numero)

  tickets = ticketResultados

  actualizarNumeros();

  if (tickets.length <= 0) msgTicketsVacios();
});

socket.on("informarAtender", async(ticket) => {
  console.log("i",ticket);
  socket.emit("getNumEscritorio", ticket._id, async (res) => {

    const ticketInfo = await res
    tickets.unshift(ticketInfo);
    console.log(tickets)
    actualizarNumeros();
  }); 
});

function actualizarNumeros() {
  div.innerHTML = "";
  let fragment = document.createDocumentFragment();
  tickets.sort((a, b) => b - a);
  console.log("t", tickets);
  tickets.forEach((t, i) => {
    if (i < 4) {
      const h1 = document.createElement("h1");
      console.log("a",t)

      h1.textContent = `${t.numero[0] || t.numero} en el escritorio ${t.escritorio.numero}`;
      fragment.appendChild(h1);
    } else {
      console.log("d", t)
      socket.emit("deleteTicket", t.numero[0] || t.numero);
    }
  });
  console.log(tickets);
  div.appendChild(fragment);
}

function msgTicketsVacios() {
  const txtTicketVacio = document.createElement("h1");

  txtTicketVacio.textContent = "Por favor genere un ticket";

  div.appendChild(txtTicketVacio);
}

async function solicitarNumero() {}
