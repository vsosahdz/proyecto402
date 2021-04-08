//Utilizar la bibliotec Sequelize
const Sequelize = require('sequelize');
//Configurar la conexión
const sequelize = new Sequelize('prueba','sa', 'Password1234$',{
    dialect: 'mssql',
    dialectOptions:{
        options:{
            useUTC: false,
            dateFirst:1
        }
    },
    define: {
        //Evitar que nos ponga createdAt y updateAt
        timestamps: false,
        //Evitar que le agregue una s
        freezeTableName: true
    }

});

const Producto = sequelize.define('productos',{
    //Atributos
    nombre :{
        type: Sequelize.STRING,
        allowNull: false
    },
    precio :{
        type: Sequelize.DECIMAL(6,2),
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    //opciones
});

const Juego= sequelize.define('juegos',{
//Atributos
    idJuego :{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    descripcion :{
        type: Sequelize.STRING,
        allowNull: true
    }
});

const Ejemplo = sequelize.define('ejemplo',{
    idJuego :{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    descripcion :{
        type: Sequelize.STRING,
        allowNull: true
    }
})

//Se conecta al sistema gestor de bases de datos
sequelize.sync()
    .then(resultado=>{
        console.log("Conexión existosa")
        //INSERT
        /*Producto.create({
            id: 2,
            nombre: 'refresco',
            precio: 15.00,
            descripcion :'lima-limon'
        }).then(resultado=>console.log('Producto creado'))*/
        //SELECT * from productos;
        Producto.findAll({attributes:['id','nombre','precio']})
            .then(registros=>{
                registros.forEach(registro=>{
                    console.log(registro.dataValues);
                });
            })
            .catch(error=>console.log(error));
    })
    .catch(error=>console.log(error));
