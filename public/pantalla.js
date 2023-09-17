const socket = io()

const div = document.querySelector("#contNumeros")
const numeros = []
socket.on("informarTicket", (num)=>{
    numeros.push(num)
})

let fragment = document.createDocumentFragment()
let contador = 0
let numero = numeros[numeros.length-1]+1
for(let i=0; i<numeros.length-1; i++){
    if(contador==4) break
    else contador+=1

    const h1 = document.createElement("h1")
    
    numero-=1
    h1.textContent=numero
    fragment.appendChild(h1)
}
div.appendChild(fragment)


