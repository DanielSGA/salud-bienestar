const mongoose = require('mongoose');

const consultaSchema = mongoose.Schema({

    paciente : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    }],

    peso : {
        type: String,
    },

    fecha: {
        type: Date,
        required : true
    },
    
    masaCorporal: {
        type: String,
    },

    grasa: {
        type: String,
    },

    musculo: {
        type: String,
    },

    grasaVisceral: {
        type: String
    },

    edadMetabolica: {
        type: String
    },

    profesional : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'profesionales'
    }],
});

const consultaModel = mongoose.model('consultas', consultaSchema);

const Consultas = {
    getAllConsultas : function(){
        return consultaModel
                .find()
                .then( consultas => {
                    return consultas;
                })
                .catch( err => {
                    return err;
                });
    },
    creaConsulta : function( nuevaConsulta ){
        return consultaModel
                .create( nuevaConsulta )
                .then( consulta => {
                    return consulta;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    getConsultaByUserId: function( _id ){
        return consultaModel
                .find( { paciente : _id } )
                .then( consulta => {
                    return consulta;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    }
}

module.exports = { Consultas };