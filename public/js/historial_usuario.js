var currentUserId = ";"


//Get all info
function setProfile( responseJSON ){

    let nombeUsuario = document.querySelector("#nombreUsuarioTitle");
    let nombeUsuarioNav = document.querySelector("#nombreUsuario");
    let edadUsuario = document.querySelector("#edadUsuarioTitle");
  
    
  
    //Get info by user id
    let url = `/api/get-userby_id?_id=${currentUserId}`;
    let settings = {
        method : 'GET'
    }
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( userInfo => {
  
            if (userInfo.nombre != null){
              nombeUsuario.innerHTML = `${userInfo.nombre}`;
              nombeUsuarioNav.innerHTML = `${userInfo.nombre}`;
            }
            else{
              nombeUsuario.innerHTML = ``;
              nombeUsuarioNav.innerHTML = ``;
            }
  
            if (userInfo.edad != null){
              edadUsuario.innerHTML = `${userInfo.edad}` + ` años`;
            }
            else{
              edadUsuario.innerHTML = ``;
            }
  
        
            
        })
        .catch( err => {
            console.log( err.message );
        });
  
  }

//Startup
function validateUser(){
    let url = "/api/validate-user";
    let settings = {
        method : 'GET',
        headers : {
            sessiontoken : localStorage.getItem( 'token' )
        }
    };
  
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
  
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            currentUserId = responseJSON._id;
            let url = `/api/get-userby_id?_id=${currentUserId}`;
  
            let settings = {
                method : 'GET'
            }
  
            fetch( url, settings )
                .then( response => {
                    if( response.ok ){
                        return response.json();
                    }
                    throw new Error( response.statusText );
                })
                .then( userJSON => {
  
                    setProfile( userJSON );
                    
                })
                .catch( err => {
                    console.log( err.message );
                });
        })
        .catch( err => {
            console.log( err.message );
            window.location.href = "../index.html";
        });
  }


  function init(){
    //Startup
    validateUser();
}
  
  
  init();
  