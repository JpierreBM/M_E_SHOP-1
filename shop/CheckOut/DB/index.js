const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");

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






app.use(express.static(path.join(__dirname, "../")));

app.get("/", function () {
	const filePath = path.resolve(__dirname,"..", "CheckOut", "index.html");
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


    //let registrarUsuario = "INSERT INTO tabla_usuarios (nombre_apellido, id_documento, email, telefono) VALUES ('"+nombreApellido+"', '"+cedula+"', '"+email+"', '"+telefono+"')";
    //let registrarUbicacion = "INTERT INTO ubicacion (departamento, city, barrio, street, carrera_calle, numero, abreviacion, abreviacion1, residencial, laboral, mensaje) VALUES ('"+departamento+"', '"+ciudad+"', '"+barrio+"', '"+nomenclatura+"', '"+pref+"', '"+Numero+"', '"+Numero1+"', '"+tipo_1+"', '"+tipo_2+"', '"+referencia+"')";
    //console.log(registrarUbicacion);
    //console.log(registrarUsuario);

    //conection.query(registrarUsuario && registrarUbicacion, function(error){
      //  if(err){
          //  throw err
        //}else{
            //res.send("Usuario registrado con exito")
       // }

    //})
    
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
//conection.end()

});

//inserto usuarios de prueba
//INSERT INTO tabla_usuarios (nombre_apellido, id_documento, email, telefono) VALUES ('
//INSERT INTO ubicacion (departamento, city, barrio, street, carrera_calle,
//abreviacion, abreviacion1, residencial, laboral, mensaje)



app.listen (3000, function () {
    console.log("server is running on port 5000 ")
});

