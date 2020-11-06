var currentUserId = ";"

// Buscador
function openSearch() {
  document.getElementById("overlay").style.display = "block";
}

function closeSearch(){
  document.getElementById("overlay").style.display = "none";
}
// Fin de Buscador


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
          let url = `/api/get-adminby_id?_id=${currentUserId}`;

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

                  //setProfile( userJSON );
                  
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

function fetchCreateProfesional(nombre, email, password){
  let url = '/api/profesionales/signup';
  results = document.querySelector(".results");

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
    
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            results.innerHTML = `<p class = "letras-azules">Registro Exitoso</p>`;
        })
        .catch( err => {
            results.innerHTML = `<p class= "letras-rojas" >Hubo un problema al realizar el registro</p>`;
            console.log(err);
        });
}

function watchAddProfesional(){
  let addBtn = document.querySelector( '.addBtn' );
  
  let inputNombre = document.querySelector("#input_nombre");
  let inputCorreo = document.querySelector("#input_correo");
  let inputPassword = document.querySelector("#input_password");

  addBtn.addEventListener( 'click' , ( event ) => {

    fetchCreateProfesional(inputNombre.value, inputCorreo.value, inputPassword.value);
    inputNombre.value = "";
    inputCorreo.value = "";
    inputPassword.value = "";
  })
}


function init(){
  //Startup
  validateUser();

  watchAddProfesional();
}


init();

