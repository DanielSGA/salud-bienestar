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
          let url = `/api/get-profesionalpor_id?_id=${currentUserId}`;

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



//Get all info
function setProfile( responseJSON ){

  let nombeUsuario = document.querySelector("#nombreUsuarioTitle");
  let nombeUsuarioNav = document.querySelector("#nombreUsuario");

  let infoNombre = document.querySelector("#info_nombre");
  let infoTelefono = document.querySelector("#info_telefono");
  let infoCorreo = document.querySelector("#info_correo");
  let infoCertificaciones = document.querySelector("#info_certificaciones");
  let infoEspecialidades = document.querySelector("#info_especialidades");

  let inputNombre = document.querySelector("#input_nombre");
  let inputTelefono = document.querySelector("#input_telefono");
  let inputCorreo = document.querySelector("#input_correo");
  let inputCertificaciones = document.querySelector("#input_certificaciones");
  let inputEspecialidades = document.querySelector("#input_especialidades");


  

  //Get info by user id
  let url = `/api/get-profesionalpor_id?_id=${currentUserId}`;
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

          nombeUsuario.innerHTML = `${userInfo.nombre}`;

          if (userInfo.nombre != null){
            nombeUsuario.innerHTML = `${userInfo.nombre}`;
            nombeUsuarioNav.innerHTML = `${userInfo.nombre}`;
            infoNombre.innerHTML = `${userInfo.nombre}`;
            inputNombre.value = `${userInfo.nombre}`;
          }
          else{
            nombeUsuario.innerHTML = ``;
            nombeUsuarioNav.innerHTML = ``;
            infoNombre.innerHTML = ``;
            inputNombre.value = ``;
          }
          
          if (userInfo.telefono != null){
            infoTelefono.innerHTML = `${userInfo.telefono}`;
            inputTelefono.value = `${userInfo.telefono}`;
          }
          else{
            infoTelefono.innerHTML = ``;
            inputTelefono.value = ``;
          }
          
          if (userInfo.email != null){
            infoCorreo.innerHTML = `${userInfo.email}`;
            inputCorreo.value = `${userInfo.email}`;
          }
          else{
            infoCorreo.innerHTML = ``;
            inputCorreo.value = ``;
          }
          
          if (userInfo.certificaciones != null){
            infoCertificaciones.innerHTML = `${userInfo.certificaciones}`;
            inputCertificaciones.value = `${userInfo.certificaciones}`;
          }
          else{
            infoCertificaciones.innerHTML = ``;
            inputCertificaciones.value = ``;
          }

          if (userInfo.especialidades != null){
            infoEspecialidades.innerHTML = `${userInfo.especialidades}`;
            inputEspecialidades.value = `${userInfo.especialidades}`;
          }
          else{
            infoEspecialidades.innerHTML = ``;
            inputEspecialidades.value = ``;
          }
          
      })
      .catch( err => {
          console.log( err.message );
      });

}

//Update info
function updateInfo(inputNombre, inputTelefono, inputCorreo, inputCertificaciones, inputEspecialidades){
  let url = "/api/profesionales/updateInfo";

  let data = {
      profesional_id : currentUserId,
      nombre : inputNombre,
      telefono : inputTelefono,
      email : inputCorreo,
      certificaciones : inputCertificaciones,
      especialidades : inputEspecialidades
  }

  let settings = {
  method : 'PATCH',
  headers : {
      sessiontoken : localStorage.getItem( 'token' ),
      'Content-Type' : 'application/json'
      },
      body : JSON.stringify( data )
  };

  fetch( url, settings )
  .then( response => {
      if( response.ok ){
          return response.json();
      }
      throw new Error( response.statusText );
  })
  .then( responseJSON => {
      let url2 = `/api/get-profesionalpor_id?_id=${currentUserId}`;

      let settings2 = {
          method : 'GET'
      }

      fetch( url2, settings2 )
          .then( response => {
              if( response.ok ){
                  return response.json();
              }
              throw new Error( response.statusText );
          })
          .then( responseJSON => {
              setProfile( responseJSON );

          })
          .catch( err => {
              console.log( err.message );
          });

  })
  .catch( err => {
      console.log( err.message );
  });
}


function watchEditBtn(){
  let editBtn = document.querySelector( '.editBtn' );
  
  let inputNombre = document.querySelector("#input_nombre");
  let inputTelefono = document.querySelector("#input_telefono");
  let inputCorreo = document.querySelector("#input_correo");
  let inputCertificaciones = document.querySelector("#input_certificaciones");
  let inputEspecialidades = document.querySelector("#input_especialidades");



  let infoNombre = document.querySelector("#info_nombre");
  let infoTelefono = document.querySelector("#info_telefono");
  let infoCorreo = document.querySelector("#info_correo");
  let infoCertificaciones = document.querySelector("#info_certificaciones");
  let infoEspecialidades = document.querySelector("#info_especialidades");

  editBtn.addEventListener( 'click' , ( event ) => {

    if (inputNombre.classList.contains("hidden")){

      editBtn.innerHTML = "ACEPTAR";

      inputNombre.classList.remove("hidden");
      inputTelefono.classList.remove("hidden");
      inputCorreo.classList.remove("hidden");
      inputCertificaciones.classList.remove("hidden");
      inputEspecialidades.classList.remove("hidden");

      infoNombre.classList.add("hidden");
      infoTelefono.classList.add("hidden");
      infoCorreo.classList.add("hidden");
      infoCertificaciones.classList.add("hidden");
      infoEspecialidades.classList.add("hidden");
    }

    else{

      updateInfo(inputNombre.value, inputTelefono.value, inputCorreo.value, inputCertificaciones.value, inputEspecialidades.value)


      editBtn.innerHTML = "EDITAR PERFIL";

      inputNombre.classList.add("hidden");
      inputTelefono.classList.add("hidden");
      inputCorreo.classList.add("hidden");
      inputCertificaciones.classList.add("hidden");
      inputEspecialidades.classList.add("hidden");

      infoNombre.classList.remove("hidden");
      infoTelefono.classList.remove("hidden");
      infoCorreo.classList.remove("hidden");
      infoCertificaciones.classList.remove("hidden");
      infoEspecialidades.classList.remove("hidden");
    }
  })
}


function init(){
  //Startup
  validateUser();

  watchEditBtn();
}


init();

