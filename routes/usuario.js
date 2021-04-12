const express = require("express");
const usuarioController = require('../controllers/usuario')
//mini app
const router = express.Router();
//CREATE
//Mostrar el formulario
router.get('/agregarUsuario',usuarioController.getAgregarUsuario);
//Obtener los datos del formulario
router.post('/agregarUsuario',usuarioController.postAgregarUsuario);
//Mostrar al usuario el resultado de la transaccion
router.get('/confirmacion',usuarioController.getConfirmacion);

//READ
//Mostrar los registros de la base de datos
router.get('/registros',usuarioController.getRegistros);
//Mostrar un solo registro de la base datos
router.get('/registro/:usuario',usuarioController.getRegistro); //params

//UPDATE
router.post('/actualizarUsuario',usuarioController.postActualizarUsuario); //query

//DELETE
router.post('/borrarUsuario/:usuario',usuarioController.postBorrarUsuario); //params

module.exports =router;



