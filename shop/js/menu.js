const abrirMenu = document.querySelector("#open-menu");
const cerrarMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");


cerrarMenu.addEventListener("click", () =>{
    aside.classList.remove("aside-visible");
});

abrirMenu.addEventListener("click", () =>{
    aside.classList.add("aside-visible");
});

