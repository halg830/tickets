const escritoriosNum = document.querySelector("#escritoriosNum")

let inputs = ""

for(let i=1; i<=5; i++){
    inputs+=`<label for=""><input type="radio" name="escritorios" value="${i}" class="escritorios">${i}</label>`
}

escritoriosNum.innerHTML = inputs
