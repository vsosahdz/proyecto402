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

exports.getRegistro = (req,res) =>{
    console.log(req.params);
    Usuario.findByPk(req.params.usuario)
    /*Usuario.findAll({
        where:{
            usuario: req.params.usuario
        }
    })*/
        .then(resultado=>{
            res.send(resultado);
        })
        .catch(error=>{
            console.log(error);
            res.send(error);
        })
}

exports.postBorrarUsuario = (req,res)=>{
    console.log(req.params);
    Usuario.findByPk(req.params.usuario)
        .then(usuario=>{
            return usuario && usuario.destroy();
        })
        .then(resultado=>{
            console.log("Usuario eliminado exitosamente")
            console.log(resultado);
            res.redirect('/usuario/confirmacion');
        })
        .catch(error=>console.log(error))
}

exports.postActualizarUsuario = (req,res)=>{
    console.log(req.query);
    Usuario.findByPk(req.query.usuario)
        .then(usuario=>{
            usuario.password = req.query.password;
            return usuario && usuario.save();
        })
        .then(resultado=>{
            console.log("Usuario actualizado exitosamente")
            console.log(resultado);
            res.redirect('/usuario/confirmacion');
        })
        .catch(error=>console.log(error))
}


