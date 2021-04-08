//Biblioteca para definir lo que es un JSON
const bodyParser = require("body-parser");
//Biblioteca para generar las rutas de acuerdo al sistema operativo
const path = require("path")
//Importar la biblioteca express para la creación de servidores
const express = require('express');

//Traer la conexión de la base de datos
const sequelize = require('./util/database');
//Traer el modelo de Usuario
const Usuario = require('./models/usuario');
//Traer las rutas
const usuarioRoutes = require('./routes/usuario');


//Crear el servidor
const app = express();

//Establecer un middleware para configura la ubicación de nuestros elementos públicos
app.use(express.static(path.join(__dirname,'public')));

//Middleware para configura la definicion de un JSON
app.use(bodyParser.json());
//Middleware para configurar la recepción de formularios
app.use(bodyParser.urlencoded({extended:true}))

//Configurar visualización de plantills
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');


app.use('/usuario',usuarioRoutes);

//Respuesta al método GET con un mensaje de texto
app.get('/',(req,res)=>{
    res.send('Hola que tal bienvenido');
});

//Respuesta al método GET con código  HTML
app.get('/formulario',(req,res)=>{
    res.send('<h1>Información recibida</h1>');
});

//Respuesta al método GET con un archivo HTML
app.get('/principal',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});

//GET para extraer información a través de la URL
app.get('/prueba/:usuario/:pais',(req,res)=>{
    //Utilizar la información para responderle al usuario
    res.send("<h1> Mira la consola "+ req.params.usuario +"</h1>");
    console.log("Hola buen dia "+ req.params.usuario);
    console.log(req.params)
});

//GET para extraer información de los atributos valor asociado a la URL
app.get('/prueba',(req,res)=>{
    res.send("<h1> Mira la consola "+ req.query.nombre +"</h1>");
    console.log(req.query);
    console.log("Mensaje concatenado "+ req.query.nombre+".");
    console.log(`Mensaje incrustado ${req.query.pais}`);
});

//GET para extraer información de un JSON
app.get('/prueba1',(req,res)=>{
    res.send("<h1>Mira la consola</h1>");
    console.log(req.body);
    console.log(req.body.escuela);
});


//POST envío de un JSON
app.post('/prueba2',(req,res)=>{
    console.log(req.body);    
    Usuario.create({
        usuario: req.body.usuarioUsuario,
        password: req.body.passwordUsuario
    }).then(resultado=>console.log("Registro exitoso"))
      .catch(error=>console.log(error));

    res.redirect("/formulario");
});

//GET enviando un formulario
app.get('/registro',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','registro.html'));
});

//Simular una consulta a la base datos y mostrar en un html
app.get('/plantillaEJS',(req,res)=>{
    //Simular consulta
    //query
    //SELECT * from usuario;
    Usuario.findAll()
        .then(registros=>{
            //console.log(registros)
            var data=[];
            registros.forEach(registro=>{
                data.push(registro.dataValues);
            });
            console.log(data);
            res.render('ejemploEJS.html',{
                personas:data,
                sesion:"Autorizado",
                hora:"14:00"
            });
        })
    
    
});

let puerto=8080;

sequelize.sync()
    .then(resultado=>{
        console.log('Conexión exitosa');
        //Lanza el servidor para escuchar peticiones
        app.listen(puerto,()=>console.log("Servidor en línea en el puerto 8080"));
    })
    .catch(error=>console.log(error));
