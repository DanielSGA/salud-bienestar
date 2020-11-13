const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({

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
    }
});

const adminModel = mongoose.model('admins', adminSchema);

const Admins = {
    getAllAdmins : function(){
        return adminModel
                .find()
                .then( admins => {
                    return admins;
                })
                .catch( err => {
                    return err;
                });
    },
    createAdmin : function( newAdmin ){
        return adminModel
                .create( newAdmin )
                .then( admin => {
                    return admin;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    getAdminByID: function( _id ){
        return adminModel
                .findOne( { _id } )
                .then( admin => {
                    return admin;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    },
    getAdminByEmail: function( email ){
        return adminModel
                .findOne( { email } )
                .then( admin => {
                    return admin;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    }
}

module.exports = { Admins };