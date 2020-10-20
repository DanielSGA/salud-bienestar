//////////////////////////// ANIMATION ///////////////////////////////////

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////// NODE  FETCH /////////////////////////////////

function userSignupFetch( nombre, email, password){
    console.log("in signup fetch");
    let url = '/api/users/signup';

    let data = {
        nombre,
        email,
        password
    }

    let settings = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    }
    

    //let results = document.querySelector( '.signup_Results' );

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            userLoginFetch( data.email, data.password )
        })
        .catch( err => {
            //results.innerHTML = `<div> ${err.message} </div>`;
            console.log(err);
        });
}

function userLoginFetch( email, password ){
    let url = '/api/users/login';

    let data = {
        email,
        password
    }

    let settings = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    }

    //let results = document.querySelector( '.login_Results' );

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            localStorage.setItem( 'token', responseJSON.token );
            window.location.href = "/pages/home.html";
        })
        .catch( err => {
            //results.innerHTML = `<div> ${err.message} </div>`;
            let url = '/api/profesionales/login';
            fetch( url, settings )
                .then( response => {
                    if( response.ok ){
                        return response.json();
                    }
                    throw new Error( response.statusText );
                })
                .then( responseJSON => {
                    localStorage.setItem( 'token', responseJSON.token );
                    window.location.href = "/pages/perfil_profesional.html";
                })
                .catch( err => {

        });

        });
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////// WATCH FORMS /////////////////////////////////


function watchLoginForm(){
    let loginForm = document.querySelector( '.sign-in-form' );

    loginForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let correo = document.getElementById( 'correo_login' ).value;
        let password = document.getElementById( 'password_login' ).value;

        userLoginFetch( correo, password );
    })
}

function watchSignupForm(){
    let loginForm = document.querySelector( '.sign-up-form' );

    loginForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let nombre = document.getElementById( 'usuario_signup' ).value;
        let correo = document.getElementById( 'correo_signup' ).value;
        let password = document.getElementById( 'password_signup' ).value;

        userSignupFetch( nombre, correo, password );
    })
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////// INITIALIZATION  /////////////////////////////


function init(){
    watchLoginForm();
    watchSignupForm();
}

init();


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////