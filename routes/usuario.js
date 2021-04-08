const express = require("express");
const path = require("path")
//mini app
const router = express.Router();

//Mostrar el formulario
router.get('/agregarUsuario',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','registro.html'));
});

//Obtener los datos del formulario
router.post('/agregarUsuario',(req,res)=>{
    res.send("Hola");
});

//Mostrar al usuario el resultado de la transaccion
router.get('/confirmacion',(req,res)=>{
    res.send("Hola");
});

//Mostrar los registros de la base de datos
router.get('/registros',(req,res)=>{
    res.send("Hola");
});

module.exports =router;



