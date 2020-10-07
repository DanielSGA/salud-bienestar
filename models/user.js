const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    email: {
        type: String
    },
    
    password: {
        type: String
    }
});

const userModel = mongoose.model('users', userSchema);

const Users = {
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
    getUserByEmail: function( email ){
        return userModel
                .findOne( { email } )
                .then( user => {
                    return user;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
    }
}

module.exports = { Users };