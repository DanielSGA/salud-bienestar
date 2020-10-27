const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jsonParser = bodyParser.json();
const bcrypt = require ( 'bcryptjs' );
const jsonwebtoken = require( 'jsonwebtoken' );
const cors = require('./middleware/cors');

//const DATABASE_URL = 'mongodb+srv://dbAdmin:dbAdminPassword@cluster0.suywl.mongodb.net/saludbienestar?retryWrites=true&w=majority'

const app = express();
app.use( express.static( "public" ) );

//importing models
const { Users } = require('./models/user');
const { Profesionales } = require('./models/profesional');
const { DATABASE_URL, PORT, SECRET_TOKEN } = require( './config' );

app.use(bodyParser.json()); //converts the data to JSON format

//Validate user endpoint, maybe make it a middleware.
app.get( '/api/validate-user', ( req, res ) => {
    const { sessiontoken } = req.headers;

    jsonwebtoken.verify( sessiontoken, SECRET_TOKEN, ( err, decoded ) => {
        if( err ){
            res.statusMessage = "Session expired!";
            return res.status( 400 ).end();
        }
        //console.log(decoded)
        return res.status( 200 ).json( decoded );
    });
});


//                                      USERS
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

//Get all users
app.get('/api/users', (req, res) => {
    console.log("Getting the list of all users" );

    Users
        .getAllUsers()
        .then( result => {
            return res.status( 200 ).json( result );
        })
        .catch( err => {
            res.statusMessage = "Something is wrong with the database, try again later.";
            return res.status( 500 ).end();
        });

});

//Get user by _id
app.get( '/api/get-userby_id', jsonParser, ( req, res ) => {

    let id = req.query._id;

    if( !id){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }

    Users
        .getUserByID( id )
        .then( result => {

            if (result.length == 0){
                res.statusMessage = `No Users with the id = ${id} were found on the list.`;
                return res.status ( 404 ).end();
            }

            //Return status text and user parsed as a json object.
            return res.status( 200 ).json( result );
        })
        .catch( err => {
            console.log(err)
            res.statusMessage = "Something is wrong with the database, try again later.";
            //500 es el típico para cuando el server está abajo.
            return res.status( 500 ).end();
        });
});

app.post( '/api/users/signup', jsonParser, ( req, res ) => {
    let {nombre, email, password} = req.body;

    if(!nombre || !email || !password){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }
    
    bcrypt.hash( password, 10 )
        .then( hashedPassword => {
            let newUser = {
                nombre : nombre,
                password : hashedPassword, 
                email
            };

            Users
                .createUser( newUser )
                .then( result => {
                    return res.status( 201 ).json( result ); 
                })
                .catch( err => {
                    res.statusMessage = err.message;
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});

app.post( '/api/users/login', jsonParser, ( req, res ) => {
    let { email, password } = req.body;

    if( !email || !password ){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }

    Users
        .getUserByEmail( email )
        .then( user => {

            if( user ){
                bcrypt.compare( password, user.password )
                    .then( result => {
                        if( result ){
                            let userData = {
                                username : user.username,
                                email : user.email,
                                _id : user._id
                            };

                            jsonwebtoken.sign( userData, SECRET_TOKEN, { expiresIn : '30m' }, ( err, token ) => {
                                if( err ){
                                    res.statusMessage = "Something went wrong with generating the token.";
                                    return res.status( 400 ).end();
                                }
                                return res.status( 200 ).json( { token } );
                            });
                        }
                        else{
                            throw new Error( "Invalid credentials" );
                        }
                    })
                    .catch( err => {
                        res.statusMessage = err.message;
                        return res.status( 400 ).end();
                    });
            }
            else{
                throw new Error( "User doesn't exist!" );
            }
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});

//const port = process.env.PORT || 4000;

app.patch( '/api/users/updateInfo', jsonParser, ( req, res ) =>{
    const { sessiontoken } = req.headers;

    jsonwebtoken.verify( sessiontoken, SECRET_TOKEN, ( err, decoded ) => {
        if( err ){
            res.statusMessage = "Session expired!";
            return res.status( 400 ).end();
        }

        //If modify is 1, we add the artwork, if its -1, we delete the artwork from the likes
        let { user_id, nombre, edad, sexo, telefono, email, antecedentes, medicamentos, alergias, discapacidades} = req.body;

        if( !user_id ){
            res.statusMessage = "Parameter missing in the body of the request.";
            return res.status( 406 ).end();
        }

        Users
        .getUserByID( user_id )
        .then( result => {

            if (result.length == 0){
                res.statusMessage = `No Users with the id = ${id} were found on the list.`;
                return res.status ( 404 ).end();
            }

            Users
                .updateUserInfo( user_id, nombre, edad, sexo, telefono, email, antecedentes, medicamentos, alergias, discapacidades )
                .then( result => {

                    if ( result.n == 0 ){
                        console.log(result)
                        res.statusMessage = "The user was not modified";
                        return res.status( 404 ).end()
                    }
                    else{
                        
                        return res.status( 202 ).json( result );
                    }
                })
                .catch( err => {
                    res.statusMessage = "Something is wrong with the database, try again later.";
                    return res.status( 500 ).end();
                });
        })
        .catch( err => {

            console.log(err)
            res.statusMessage = "Something is wrong with the database, try again later.";
            //500 es el típico para cuando el server está abajo.
            return res.status( 500 ).end();
        });
    });
})


//                                   PROFESIONALES
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

//Obtener a todos los profesionales
app.get('/api/profesionales', (req, res) => {
    console.log("Obteniendo una lista de todos los profesionales" );

    Profesionales
        .getProfesionales()
        .then( result => {
            return res.status( 200 ).json( result );
        })
        .catch( err => {
            res.statusMessage = "Something is wrong with the database, try again later.";
            return res.status( 500 ).end();
        });
});

//Get profesional _id
app.get( '/api/get-profesionalpor_id', jsonParser, ( req, res ) => {

    let id = req.query._id;

    if( !id){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }

    Profesionales
        .getProfesionalPorID( id )
        .then( result => {

            if (result.length == 0){
                res.statusMessage = `No Users with the id = ${id} were found on the list.`;
                return res.status ( 404 ).end();
            }

            //Return status text and user parsed as a json object.
            return res.status( 200 ).json( result );
        })
        .catch( err => {
            console.log(err)
            res.statusMessage = "Something is wrong with the database, try again later.";
            //500 es el típico para cuando el server está abajo.
            return res.status( 500 ).end();
        });
});

//Get profesionales por titulo
app.get( '/api/get-profesionalpor_titulo', jsonParser, ( req, res ) => {

    let titulo = req.query.titulo;

    if( !titulo){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }

    Profesionales
        .getProfesionalesPorTitulo( titulo )
        .then( result => {

            console.log(result)
            if (result.length == 0){
                res.statusMessage = `No Users with the titulo = ${titulo} were found on the list.`;
                return res.status ( 404 ).end();
            }

            //Return status text and user parsed as a json object.
            return res.status( 200 ).json( result );
        })
        .catch( err => {
            console.log(err)
            res.statusMessage = "Something is wrong with the database, try again later.";
            //500 es el típico para cuando el server está abajo.
            return res.status( 500 ).end();
        });
});

app.post( '/api/profesionales/signup', jsonParser, ( req, res ) => {
    let {nombre, email, password} = req.body;

    if(!nombre || !email || !password){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }
    
    bcrypt.hash( password, 10 )
        .then( hashedPassword => {
            let newProfesional = {
                nombre : nombre,
                password : hashedPassword, 
                email
            };

            Profesionales
                .crearProfesional( newProfesional )
                .then( result => {
                    return res.status( 201 ).json( result ); 
                })
                .catch( err => {
                    res.statusMessage = err.message;
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});

app.post( '/api/profesionales/signupcontitulo', jsonParser, ( req, res ) => {
    let {nombre, email, password, titulo} = req.body;

    if(!nombre || !email || !password || !titulo){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }
    
    bcrypt.hash( password, 10 )
        .then( hashedPassword => {
            let newProfesional = {
                nombre : nombre,
                password : hashedPassword,
                titulo : titulo,
                email
            };

            Profesionales
                .crearProfesional( newProfesional )
                .then( result => {
                    return res.status( 201 ).json( result ); 
                })
                .catch( err => {
                    res.statusMessage = err.message;
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});


app.post( '/api/profesionales/login', jsonParser, ( req, res ) => {
    let { email, password } = req.body;

    if( !email || !password ){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }

    Profesionales
        .getProfesionalPorEmail( email )
        .then( profesional => {

            if( profesional ){
                bcrypt.compare( password, profesional.password )
                    .then( result => {
                        if( result ){
                            let profesionalData = {
                                username : profesional.username,
                                email : profesional.email,
                                _id : profesional._id
                            };

                            jsonwebtoken.sign( profesionalData, SECRET_TOKEN, { expiresIn : '30m' }, ( err, token ) => {
                                if( err ){
                                    res.statusMessage = "Something went wrong with generating the token.";
                                    return res.status( 400 ).end();
                                }
                                return res.status( 200 ).json( { token } );
                            });
                        }
                        else{
                            throw new Error( "Invalid credentials" );
                        }
                    })
                    .catch( err => {
                        res.statusMessage = err.message;
                        return res.status( 400 ).end();
                    });
            }
            else{
                throw new Error( "User doesn't exist!" );
            }
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});

//const port = process.env.PORT || 4000;

app.patch( '/api/profesionales/updateInfo', jsonParser, ( req, res ) =>{
    const { sessiontoken } = req.headers;

    jsonwebtoken.verify( sessiontoken, SECRET_TOKEN, ( err, decoded ) => {
        if( err ){
            res.statusMessage = "Session expired!";
            return res.status( 400 ).end();
        }

        let { profesional_id, nombre, telefono, email, certificaciones, especialidades, titulo} = req.body;

        if( !profesional_id ){
            res.statusMessage = "Parameter missing in the body of the request.";
            return res.status( 406 ).end();
        }

        Profesionales
        .getProfesionalPorID( profesional_id )
        .then( result => {

            if (result.length == 0){
                res.statusMessage = `No Users with the id = ${id} were found on the list.`;
                return res.status ( 404 ).end();
            }

            Profesionales
                .updateProfesionalInfo( profesional_id, nombre, telefono, email, certificaciones, especialidades, titulo)
                .then( result => {

                    if ( result.n == 0 ){
                        console.log(result)
                        res.statusMessage = "The user was not modified";
                        return res.status( 404 ).end()
                    }
                    else{
                        
                        return res.status( 202 ).json( result );
                    }
                })
                .catch( err => {
                    res.statusMessage = "Something is wrong with the database, try again later.";
                    return res.status( 500 ).end();
                });
        })
        .catch( err => {

            console.log(err)
            res.statusMessage = "Something is wrong with the database, try again later.";
            //500 es el típico para cuando el server está abajo.
            return res.status( 500 ).end();
        });
    });
})







app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);

    new Promise( ( resolve, reject ) => {

        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});