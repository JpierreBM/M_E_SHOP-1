const productos = [
    {
        id:"13 nuevo",
        titulo:"iPhone 13",
        color:"#",
        imagen: "/imagePROD/iPhone-13-Red.jpg",
        categoria:{
            nombre: "nuevo",
            almacenamiento: "128GB",
            id:"nuevo",
        },
        precio: 2990000 
    },
    {
        id:"14 nuevo",
        titulo:"iPhone 14",
        color:"#",
        imagen: "/imagePROD/iphone 14 1.jpg",
        categoria:{
            nombre: "nuevo",
            almacenamiento: "128GB",
            id:"nuevo",

        },
        precio: 3290000
    },
    {
        id:"15 nuevo",
        titulo:"iPhone 15",
        color:"#",
        imagen: "/imagePROD/iPhone 15 pro.png",
        categoria:{
            nombre: "nuevo",
            almacenamiento: "128GB",
            id:"nuevo",

        },
        precio: 3650000
    },
    {
        id:"15 Pro nuevo",
        titulo:"iPhone 15 Pro",
        color:"#",
        imagen: "/imagePROD/iPhone-15-Ultra.jpg",
        categoria:{
            nombre: "nuevo",
            almacenamiento: "128GB",
            id:"nuevo",

        },
        precio: 4300000
    },
    {
        id:"15 Pro Max nuevo",
        titulo:"iPhone 15 Pro Max",
        color:"#",
        imagen: "/imagePROD/iphone 15 pro max.jpg",
        categoria:{
            nombre: "nuevo",
            almacenamiento: "256GB",
            id:"nuevo",
        },
        precio: 5250000
    },
    {
        id:"whatch se 40mm nuevo",
        titulo:"Apple Whatch SE 40mm",
        color:"#",
        imagen: "/imagePROD/iPhone se.png",
        categoria:{
            nombre: "nuevo",
            id:"nuevo",

        },
        precio: 1390000
    },
    {
        id:"whatch s6 44mm usado",
        titulo:"Apple Whatch S6 44mm",
        color:"#",
        imagen: "/imagePROD/IPHONE-SE-2022-ROJO.jpg",
        categoria:{
            nombre: "usado",
            id:"usado",

        },
        precio: 800000
    },

    
];

//se hace el llamado a la seccion donde se almacenan los productos 
const contenedorProductos = document.querySelector("#contenedor-productos");


//este es el boton de las categorias
const botonesCategorias = document.querySelectorAll(".boton-categoria");


//este es el llamado al titulo de cada seccion de los botones
const tituloPrincipal = document.querySelector("#titulo-principal");


//aqui hago el llamado al contador del carrito
const contador = document.querySelector("#contador");



//aca se cargan todos los productos
function cargarProductos (productosElegidos){


    //aca se resetea y deja en blanco nuevamente la pagina de los productos para poner los productos segun su categoria sin repetir
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
        <div class="producto-imagen">
        <img  src= "${producto.imagen}" alt="${producto.titulo}">
        </div>
        <div class= "producto-detalles">
        <h2 class" producto-titulo">${producto.titulo}</h3>
        <p class="producto-precio">$${producto.precio}</p>
        <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>

        `;
        contenedorProductos.append(div);

    })
    //se agrega esta funcion aca para mantener el mismo boton con su respectivo id y no se este creando un boton nuevo cada ves 
    actualizarBotonesAgregar();
}

//esto carga los productos de la pagina 



cargarProductos(productos);

//esto es para activar la barra blanca de cada boton 
botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e) =>{
        //elimina el active de los otros botones par dejar solo uno es decir un reset boton 
botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        //aca se hace el llamado a la funcion que carga los productos segun la categoria
        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id  === e.currentTarget.id);

            //este parrafo de texto agrega al html el titulo segun la seleccion del nombre segun su categoria
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            
        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);


        //si esto no sucede se mantienen todos los productos y su titulo como parametro base
        }else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

//la funcion hace el llamado al boton agregar
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    //se antidcipa que al boton agregar cada que escucha va a ejecutar agregar al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
});
}


//funcion para agregar al carrito desde la memoria para llevar su conteo real de productos 

let productosEnCarrito;
const productosEnCarritoLS = localStorage.getItem('productos-en-carrito');

//se establese para mantener el conteo de los productos
if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);

    //se llama a la funcion de para mantener actualizado el conteo en vivo 
    actualizarContador();
}else{
    productosEnCarrito = [];
}
//hace el llamado para grear un array para los productos donde se van a almacenar los productos del carrito


//funcion para agregar al carrito
function agregarAlCarrito(e) {

        //
        const idBoton = e.currentTarget.id;
        const productoAgregado = productos.find(producto => producto.id === idBoton);
        

    //si el producto ya esta en el carrito no se agrega
        if (productosEnCarrito.some (producto => producto.id === idBoton)){

            //aqui llama al index para encontrar el producto en su matriz
            const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

            //aqui se realiza la suma de la cantidad segun los objetos que se vayan agregando
            productosEnCarrito[index].cantidad++;


            //si el producto no esta en el carrito entonces  se agrega 
        }else{

            //aqui se le agrega el valor que se va a sumar a la cantidad
            productoAgregado.cantidad = 1;


            //aqui se agrega otra caracteristica llamada cantidad con su valor
            productosEnCarrito.push(productoAgregado);
        }


        //se llaama a la funcion para iniciar el conteo
        actualizarContador();



        
        //agregarProdutoAMemoria();
        //se llama a la funcion para agregar el producto a la memoria
        localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));

}


//aca se hace el llamado del array para almacenarlo y poder hacer el llamado de los productos agregados desde la otra pagina de carrito
//const agregarProdutoAMemoria = () =>{
  //  localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
   // };


//esta funcion actualiza los datos y inicia el conteo en el contador
function actualizarContador(){

    //aca se declara el calor del nuevo contador y se aclara que el conteo inicia desde 0
    let nuevoContador = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    //aca se llama a que en el conteo se vaya excribiendo en el html
    contador.innerText = nuevoContador;
    
}



