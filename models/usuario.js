const Sequelize = require('sequelize');
//Traer el objeto sequelize 
const sequelize = require('../util/database');
//Definicion del modelo (tabla)

const Usuario = sequelize.define('usuario',{
    usuario:{
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    password:{
        type: Sequelize.STRING(15),
        allowNull: false
    }
});

module.exports = Usuario;