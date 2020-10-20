const mongoose = require('mongoose');

const profesionalSchema = mongoose.Schema({

    email: {
        type: String,
        required : true,
        unique : true
    },
    
    password: {
        type: String,
        required : true,
        unique : true
    },

    nombre: {
        type: String,
        required : true,
        unique : true
    },

    telefono: {
        type: String
    },

    certificaciones: {
        type: String
    },

    especialidades: {
        type: String
    }
});

const profesionalModel = mongoose.model('profesionales', profesionalSchema);

const Profesionales = {
    getProfesionales : function(){
        return profesionalModel
                .find()
                .then( profesionales => {
                    return profesionales;
                })
                .catch( err => {
                    return err;
                });
    },
    crearProfesional : function( nuevoProfesional ){
        return profesionalModel
                .create( nuevoProfesional )
                .then( profesional => {
                    return profesional;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    getProfesionalPorID: function( _id ){
        return profesionalModel
                .findOne( { _id } )
                .then( profesional => {
                    return profesional;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    getProfesionalPorEmail: function( email ){
        return profesionalModel
                .findOne( { email } )
                .then( profesional => {
                    return profesional;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    updateProfesionalInfo : function( profesional_id, nombre, telefono, email, certificaciones, especialidades){
        return profesionalModel
                .updateOne({ _id: profesional_id },{ $set : { nombre : nombre,
                     telefono : telefono, email : email, certificaciones : certificaciones,
                      especialidades : especialidades}})
                .then( userUpdated => {
                    return userUpdated;
                })
                .catch( err => {
                    return err;
                });
    }
}

module.exports = { Profesionales };