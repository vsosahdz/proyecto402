//Traer el modelo asociado a la tabla usuario
const Usuario = require('../models/usuario');
const path = require('path');

exports.getAgregarUsuario = (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','registro.html'));
}

exports.postAgregarUsuario = (req,res)=>{
    console.log(req.body);    
    Usuario.create({
        usuario: req.body.usuarioUsuario,
        password: req.body.passwordUsuario
    }).then(resultado=>console.log("Registro exitoso"))
      .catch(error=>console.log(error));

    res.redirect("/usuario/confirmacion");
}; 

exports.getConfirmacion = (req,res)=>{
    res.send("Registro exitoso");
};

exports.getRegistros = (req,res)=>{
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
    
    
};
