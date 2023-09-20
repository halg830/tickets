const socket = io();

const div = document.querySelector("#contNumeros");
let tickets = []

socket.on("connect", () => {
  console.log("En linea");
});

socket.emit("getTicketsAtendiendo",(res)=>{
  res.forEach(n=>{
    tickets.push(n.numero)
  })

  actualizarNumeros()

  if(tickets.length<=0) msgTicketsVacios()
})

socket.on("informarAtender", (num) => {
   tickets.unshift(num[0])
  actualizarNumeros()
});

function actualizarNumeros (){
    div.innerHTML=""
    let fragment = document.createDocumentFragment();
    tickets.sort((a,b)=>b-a)

    tickets.forEach((t, i)=>{
      if(i<4){
        const h1 = document.createElement("h1");

        h1.textContent = t;
        fragment.appendChild(h1);
      }else{
        socket.emit("deleteTicket", t)
      }
    })
    console.log(tickets)
    div.appendChild(fragment);
  };