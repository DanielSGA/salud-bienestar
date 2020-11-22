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


                  setProfile(processUser());
                  setNombres(userJSON.nombre);
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


function setNombres( nombreUsuario)
{
    let nombre1 = document.querySelector("#nombreUsuario");

    nombre1.innerHTML = nombreUsuario;

}

function processUser()
  {
    var parameters = location.search.substring(1);
    console.log(parameters);

    var temp = parameters.split("=");
    id = unescape(temp[1]);
    return id;
  }


//Get all info
function setProfile( idProfesional ){

  let nombeUsuario = document.querySelector("#nombreUsuarioTitle");

  let infoNombre = document.querySelector("#info_nombre");
  let infoTelefono = document.querySelector("#info_telefono");
  let infoCorreo = document.querySelector("#info_correo");
  let infoCertificaciones = document.querySelector("#info_certificaciones");
  let infoEspecialidades = document.querySelector("#info_especialidades");

  let infoTitulo = document.querySelector("#info_titulo");

  

  //Get info by user id
  let url = `/api/get-profesionalpor_id?_id=${idProfesional}`;
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
            infoNombre.innerHTML = `${userInfo.nombre}`;
          }
          else{
            nombeUsuario.innerHTML = ``;
            infoNombre.innerHTML = ``;
          }
          
          if (userInfo.telefono != null){
            infoTelefono.innerHTML = `${userInfo.telefono}`;
          }
          else{
            infoTelefono.innerHTML = ``;
          }
          
          if (userInfo.email != null){
            infoCorreo.innerHTML = `${userInfo.email}`;
          }
          else{
            infoCorreo.innerHTML = ``;
          }
          
          if (userInfo.certificaciones != null){
            infoCertificaciones.innerHTML = `${userInfo.certificaciones}`;
          }
          else{
            infoCertificaciones.innerHTML = ``;
          }

          if (userInfo.especialidades != null){
            infoEspecialidades.innerHTML = `${userInfo.especialidades}`;
          }
          else{
            infoEspecialidades.innerHTML = ``;
          }

          if (userInfo.titulo != null){
            infoTitulo.innerHTML = `${userInfo.titulo}`;
          }
          else{
            infoTitulo.innerHTML = ``;
          }
          
      })
      .catch( err => {
          console.log( err.message );
      });

}

function init(){
  //Startup
  validateUser();
}


init();

