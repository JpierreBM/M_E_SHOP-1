let productosEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito'));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");

const contenedorCarritoProductos = document.querySelector("#carrito-productos");

const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");

const precioTotal = document.querySelector("#total")

//vaciar carrito
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");

//boton eliminar
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");


//esta es la funcion d¿que crea productos los carga o elimina titulos y no hay productos en pantalla 
function cargarProductosCarrito(){


    // Cargar productos del carrito desde el localStorage
    if(productosEnCarrito && productosEnCarrito.length > 0) {


        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");

        contenedorCarritoProductos.innerHTML ="";

        productosEnCarrito.forEach(producto  => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
    
    
    div.innerHTML =
    `
    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="carrito-producto-titulo">
        <small>Titulo</small>
        <h3>${producto.titulo}</h3>
    </div>
    <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p>${producto.cantidad}</p>
    </div>
    <div class="carrito-producto-precio">
        <small>Precio</small>
        <p>$${producto.precio}</p>
    </div>
    <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
        <p>$ ${producto.precio * producto.cantidad} </p>
    </div>
    <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
    `;
    
    contenedorCarritoProductos.append(div);
    

});
    }else{
        console.log("no hay producto");
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
    }

    
    //quiero que se recarguen al mismo tiempo que se vuelva a recargar la pagina
    actualizarBotonesEliminar();
    actualizaTotal();
}


cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    });

}

function eliminarDelCarrito (e){

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    


    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    console.log(productosEnCarrito);

    const repeat = productosEnCarrito.some((repeatProduct) => repeatProduct.id === producto.id);

if(repeat){
    productosEnCarrito,map((prod) => {
        if(prod.id === producto.id){
            prod.cantidad--;
        }
    });
}


    localStorage.setItem('productos-en-carrito' , JSON.stringify(productosEnCarrito));

}






//boton de vaciar el carrito
botonVaciar.addEventListener("click", vaciarCarrito);

//vaciar el carrito
function vaciarCarrito () {
    

        productosEnCarrito.length = 0 ;
        localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();

    
}

function  actualizaTotal (){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio), 0);

    precioTotal.innerText = `$${totalCalculado}`;
}

