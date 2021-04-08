var Connection = require('tedious').Connection;

//Configurar la conexión a la base de datos JSON
var configuracion = {
    //La dirección IP o el nombre del equipo al que me quiero conectar
    server: 'localhost',
    authentication:{
        type: 'default',
        options:{
            userName: 'sa',
            password: 'Password1234$'
        }
    },
    options:{
        port:1433,
        database: 'prueba',
        trustServerCertificate: true
    }
};

//Una instancia de la clase Connection con mi configuración
var connection = new Connection(configuracion);

connection.on('connect',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Conexión existosa");
        ejercutarConsulta();
    }
});

//Generando el evento artificialmente
connection.connect();

var Request = require('tedious').Request;

function ejercutarConsulta(){
    request = new Request('SELECT * FROM Usuarios FOR JSON AUTO;',(err)=>{
        if(err)
            console.log(err);
        else
            console.log("Query válida");
    });
    var result="";
    request.on('row',function(columns){
        columns.forEach(function(column){
            if(column.value === null){
                console.log('NULL');
            }else{
                result+= column.value + " ";
            }
        });
        console.log(JSON.parse(result));
        result="";
    });

    connection.execSql(request);
}

