
let productosCheckout = JSON.parse(localStorage.getItem('productos-en-carrito'));
console.log(productosCheckout);

const mercadopago = new MercadoPago('<public_key>', {
    locale: 'es-CO'
});

document.getElementById("checkout-btn").addEventListener("click", async() =>{

    try{
        
        const orderData = {
            image: `${producto}`, // aca enlazo la imagen del producto
            title: `${producto}`, //aca enlazo el nombre del producto
            quantity: `${producto}`, //aca enlazo la cantidad de producto
            price: `${producto}`, // aca enlazo el precio del producto
        };
        const response = await fetch("http//localhost:5000/create_preference",{
        method: "post",
        headers:{
            "Content-Type": "application/json", 
        },
        body:JSON.stringify(orderData), 
    });
    const preference = await response.json();
    createCheckoutButton(preference.id);
    } catch(error){
        alert("error");
    }

    
});

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () =>{
        if(window.CheckoutButton) window.checkoutButton.unmount();

        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId
            },
        });
    };

    renderComponent();
};


//seccion de prueba cargar los productos desde el local storage








//se carga  el server de la base de datos
let conection = mysql.createConnection({
    host: "localhost",
    database: "movil_express",
    user: "pierrebuitrago",
    password: "devpierre"
});

conection.connect((err) => {
    if (err) throw err
    console.log("Conectado a la base de datos movil_express")
})



app.use(express.static(path.join(__dirname, "../CheckOut")));

app.get("/", function () {
	const filePath = path.resolve(__dirname,"../", "CheckOut", "index.html");
	es.sendFile(filePath);
});

app.use(express.json());
app.use(express.urlencoded({extend:false}));


app.post("/validar", function (req, res) {
    const datos = req.body;

    let nombreApellido = datos.name_lastname;
    let cedula = datos.cedula;
    let email = datos.email;
    let telefono = datos.telefono;
    let departamento = datos.departamento;
    let ciudad = datos.ciudad;
    let barrio = datos.barrio;
    let nomenclatura = datos.nomenclatura;
    let pref = datos.pref;
    let Numero = datos.Numero;
    let Numero1 = datos.Numero1;
    let categoria = datos.desc;
    let tipo_1 = datos.residencial;
    let tipo_2 = datos.laboral;
    let referencia = datos.referencia;

    
    const registrarUsuario = "INSERT INTO tabla_usuarios (nombre_apellido, id_documento, email, telefono) VALUES ('"+nombreApellido+"', '"+cedula+"', '"+email+"', '"+telefono+"')"
const registrarUbicacion = "INSERT INTO ubicacion (departamento, city, barrio, street, numero, abreviacion, abreviacion1, categoria, residencial, laboral, mensaje) VALUES ('"+departamento+"', '"+ciudad+"', '"+barrio+"', '"+nomenclatura+"', '"+pref+"', '"+Numero+"', '"+Numero1+"','"+categoria+"', '"+tipo_1+"', '"+tipo_2+"', '"+referencia+"')"
conection.query(registrarUsuario, (err, row) =>{
    if(err) throw err
})
conection.query(registrarUbicacion, (err, row) =>{
    if(err) throw err
})

conection.query("SELECT * from ubicacion", (err, row) =>{
    if (err) throw err
    console.log('la direccion del usuario es:')
    console.log(row)
    
})

conection.query("SELECT * from tabla_usuarios", (err, row) =>{
    if (err) throw err
    console.log('nombre del usuario es:')
    console.log(row)

})
})


app.listen (3000, function () {
    console.log("server is running on port 5000 ")
});


