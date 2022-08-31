import FX from "../src/soundFX.js";
const fx = new FX();

let author = document.querySelector(".author");
let flag = true;

document.addEventListener("click",removePopup);
document.addEventListener("keydown",removePopup)

function removePopup(){
    if (flag) {
        fx.sound();
        flag = false;
    }
    author.style.display = "none";
}