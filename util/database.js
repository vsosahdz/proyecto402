//Configuracion de sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('app402','sa','Password1234$',{
    dialect: 'mssql',
    dialectOptions:{
        options:{
            useUTC: false,
            dataFirst: 1
        }
    },
    define:{
        timestamps: false,
        freezeTableName:true
    }
});

//exportando el objeto sequelize
module.exports = sequelize;