const socket = io();

const data = {
  bloqueados: 0
}

const txtNombre = document.querySelector("#txtNombre");
const btnIngresar = document.querySelector("#btnIngresar");
const btnDia = document.querySelector("#btnDia");

socket.on("connect", () => {
  console.log("En linea");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

socket.on("saluden", (data) => {
    
    document.querySelectorAll(".escritorios").forEach((e) => {
        if(e.value==data.numero){
            e.setAttribute("disabled", "true")
        }})
});

btnIngresar.addEventListener("click", () => {
    const datos = {
        "numero": "0",
    };

  document.querySelectorAll(".escritorios").forEach((e) => {
    if(e.checked){
        datos.numero = e.value
        e.setAttribute("disabled", "true")
        data.bloqueados.push(e.value)
        console.log(data.bloqueados)
        return
    }

  });

  socket.emit("saludar", datos, (msg) => {
    console.log(msg);
  });
});

const escritoriosNum = document.querySelector("#escritoriosNum");

let inputs = "";

for (let i = 1; i <= 5; i++) {

  socket.emit("pedir", i, (num)=>{
    console.log(data)
    if(num) data.bloqueados.push(num)
  })

  const bloqueados = data.bloqueados

  if (bloqueados || bloqueados==0) {
    inputs += `<label for=""><input type="radio" name="escritorios" value="${i}" class="escritorios" disabled>${i}</label>`;
    continue;
  }

  inputs += `<label for=""><input type="radio" name="escritorios" value="${i}" class="escritorios">${i}</label>`;
}

escritoriosNum.innerHTML = inputs;


/* btnDia.addEventListener("click", () => {
  socket.emit("devuelvaFecha", (msg) => {
    console.log(msg);
  });
});
 */
