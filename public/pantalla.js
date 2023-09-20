const socket = io();

const div = document.querySelector("#contNumeros");
let ticket = 0

socket.on("connect", () => {
  console.log("En linea");
});

socket.on("informarTicket", (num) => {
   ticket = num
  actualizarNumeros()
});

function actualizarNumeros (){
    div.innerHTML=""
    let fragment = document.createDocumentFragment();
    let contador = 0;
    let numero = ticket+1

    for (let i = 0; i < 4; i++) {
      if (contador == 4 || numero<=1) break;
      else contador += 1;
  
      const h1 = document.createElement("h1");
  
      numero -= 1;
      h1.textContent = numero;
      fragment.appendChild(h1);
    }
    div.appendChild(fragment);
  };