const socket = io();

const data = {
  bloqueados: [],
};

const txtNombre = document.querySelector("#txtNombre");
const btnIngresar = document.querySelector("#btnIngresar");
const btnDia = document.querySelector("#btnDia");
const btnFormatear = document.querySelector("#btnFormatear")

btnFormatear.addEventListener("click", ()=>{
  socket.emit("formatear", ()=>{
    console.log("listo socio")
  })
})

socket.on("connect", () => {
  console.log("En linea");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

socket.on("saluden", (data) => {
  document.querySelectorAll(".escritorios").forEach((e) => {
    if (e.value == data.numero) {
      e.setAttribute("disabled", "true");
    }
  });
});

btnIngresar.addEventListener("click", () => {
  const datos = {
    numero: "0",
  };

  document.querySelectorAll(".escritorios").forEach((e) => {
    if (e.checked) {
      console.log(e.value);
      datos.numero = e.value;
      e.setAttribute("disabled", "true");
      data.bloqueados.push(e.value);
      console.log(data.bloqueados);
      return;
    }
  });

  if (datos.numero != "0") {
    // Almacenar el número en localStorage
    localStorage.setItem('numero', datos.numero);


    socket.emit("saludar", datos, (msg) => {
      console.log(msg);
    });  
  }
});

const escritoriosNum = document.querySelector("#escritoriosNum");

const promesas = [];

for (let i = 1; i <= 5; i++) {
  
  const buscarNumero = () => {
    
    return new Promise((resolve, reject) => {
      
      socket.emit("pedir", i, (res) => {
        console.log("hola")
        console.log("res", res[0].numero)
        if (res[0].numero > 0) {
          console.log("res", res[0].numero)
          resolve(res[0].numero);
        } else {
          resolve(null);
        }
      });
    });
  };

  promesas.push(
    buscarNumero()
      .then((bloqueados) => {
        console.log("bloqueados", bloqueados);

        if (bloqueados !== null) {
          return `<label for=""><input type="radio" name="escritorios" value="${i}" class="escritorios" disabled>${i}</label>`;
        } else {
          return `<label for=""><input type="radio" name="escritorios" value="${i}" class="escritorios">${i}</label>`;
        }
      })
      .catch((error) => {
        console.error(error);
        return ""; 
      })
  );
}

Promise.all(promesas)
  .then((resultados) => {
    const contenido = resultados.join(""); 
    escritoriosNum.innerHTML = contenido;
  })
  .catch((error) => {
    console.error(error);
  });
/* btnDia.addEventListener("click", () => {
  socket.emit("devuelvaFecha", (msg) => {
    console.log(msg);
  });
});
 */
