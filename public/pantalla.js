const socket = io();

const div = document.querySelector("#contNumeros");
let tickets = []

socket.on("connect", () => {
  console.log("En linea");
});

socket.emit("getTicketsAtendiendo", (res)=>{
  res.forEach(n=>{
    const ticket = {
        id: n._id,
        numero: [n.numero]
    }

    socket.emit("getNumEscritorio", n._id, async(res)=>{
        ticket.id = await res.escritorio.numero
    })

    
    tickets.push(ticket)
  })

  actualizarNumeros()

  if(tickets.length<=0) msgTicketsVacios()
})

socket.on("informarAtender", (ticket) => {
    console.log(ticket)
   tickets.unshift(ticket)
  actualizarNumeros()
});

function actualizarNumeros (){
    div.innerHTML=""
    let fragment = document.createDocumentFragment();
    tickets.sort((a,b)=>b-a)

    tickets.forEach((t, i)=>{
      if(i<4){
        const h1 = document.createElement("h1");

        h1.textContent = `${t.numero[0] || t.numero} en el escritorio ${t.id}`;
        fragment.appendChild(h1);
      }else{
        socket.emit("deleteTicket", t.numero[0]||t.numero)
      }
    })
    console.log(tickets)
    div.appendChild(fragment);
  };

function msgTicketsVacios(){
    const txtTicketVacio = document.createElement("h1")

    txtTicketVacio.textContent = "Por favor genere un ticket"

    div.appendChild(txtTicketVacio)
}

async function solicitarNumero(){
    
}