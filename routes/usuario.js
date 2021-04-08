const express = require("express");
const usuarioController = require('../controllers/usuario')
//mini app
const router = express.Router();

//Mostrar el formulario
router.get('/agregarUsuario',usuarioController.getAgregarUsuario);

//Obtener los datos del formulario
router.post('/agregarUsuario',usuarioController.postAgregarUsuario);

//Mostrar al usuario el resultado de la transaccion
router.get('/confirmacion',usuarioController.getConfirmacion);

//Mostrar los registros de la base de datos
router.get('/registros',usuarioController.getRegistros);

module.exports =router;



