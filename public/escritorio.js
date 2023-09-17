const socket = io();

const txtNumero = document.querySelector("#numeroEscritorio")

const numero = localStorage.getItem('numero');
txtNumero.textContent=numero
