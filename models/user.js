const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

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
    
    edad: {
        type: String
    },

    sexo: {
        type: String
    },

    telefono: {
        type: String
    },

    antecedentes: {
        type: String
    },

    medicamentos: {
        type: String
    },

    alergias: {
        type: String
    },

    discapacidades: {
        type: String
    }
});

const userModel = mongoose.model('users', userSchema);

const Users = {
    getAllUsers : function(){
        return userModel
                .find()
                .then( users => {
                    return users;
                })
                .catch( err => {
                    return err;
                });
    },
    createUser : function( newUser ){
        return userModel
                .create( newUser )
                .then( user => {
                    return user;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    getUserByID: function( _id ){
        return userModel
                .findOne( { _id } )
                .then( user => {
                    return user;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    getUserByEmail: function( email ){
        return userModel
                .findOne( { email } )
                .then( user => {
                    return user;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    updateUserInfo : function( user_id, nombre, edad, sexo, telefono, email, antecedentes, medicamentos, alergias, discapacidades ){
        return userModel
                .updateOne({ _id: user_id },{ $set : { nombre : nombre, edad : edad, sexo : sexo,
                     telefono : telefono, email : email, antecedentes : antecedentes,
                      medicamentos : medicamentos, alergias: alergias, discapacidades: discapacidades  }})
                .then( userUpdated => {
                    return userUpdated;
                })
                .catch( err => {
                    return err;
                });
    },
}

module.exports = { Users };