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

function userSignupFetch( usuario, correo, password){
    let url = '/api/users/register';

    let data = {
        usuario,
        correo,
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
            userLoginFetch( data.correo, data.password )
        })
        .catch( err => {
            //results.innerHTML = `<div> ${err.message} </div>`;
        });
}

function userLoginFetch( correo, password ){
    let url = '/api/users/login';

    let data = {
        correo,
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
        });
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////// WATCH FORMS /////////////////////////////////


function watchLoginForm(){
    let loginForm = document.querySelector( '.sign-in-form' );

    loginForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let correo = document.getElementById( 'correo_login' ).value;
        let password = document.getElementById( 'password_Login' ).value;

        userLoginFetch( correo, password );
    })
}

function watchSignupForm(){
    let loginForm = document.querySelector( '.sign-up-form' );

    loginForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let usuario = document.getElementById( 'usuario_signup' ).value;
        let correo = document.getElementById( 'correo_signup' ).value;
        let password = document.getElementById( 'password_signup' ).value;

        userSignupFetch( usuario, correo, password );
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