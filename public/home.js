const escritoriosNum = document.querySelector("#escritoriosNum")

let inputs = ""

for(let i=1; i<=5; i++){
    inputs+=`<label for=""><input type="radio" name="escritorios" id="escritorio${i}">${i}</label>`
}

escritoriosNum.innerHTML = inputs