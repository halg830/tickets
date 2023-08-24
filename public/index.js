const data = {
    bloqueados:[]
}

const socket = io();

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
        numero: 0,
    };

  document.querySelectorAll(".escritorios").forEach((e) => {
    if(e.checked){
        datos.numero = parseInt(e.value)
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

/* btnDia.addEventListener("click", () => {
  socket.emit("devuelvaFecha", (msg) => {
    console.log(msg);
  });
});
 */
