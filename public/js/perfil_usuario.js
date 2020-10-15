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
  let edadUsuario = document.querySelector("#edadUsuarioTitle");

  let infoNombre = document.querySelector("#info_nombre");
  let infoEdad = document.querySelector("#info_edad");
  let infoSexo = document.querySelector("#info_sexo");
  let infoTelefono = document.querySelector("#info_telefono");
  let infoCorreo = document.querySelector("#info_correo");
  let infoAntecedentes = document.querySelector("#info_antecedentes");
  let infoMedicamentos = document.querySelector("#info_medicamentos");
  let infoAlergias = document.querySelector("#info_alergias");
  let infoDiscapacidaddes = document.querySelector("#info_discapacidades");

  let inputNombre = document.querySelector("#input_nombre");
  let inputEdad = document.querySelector("#input_edad");
  let inputSexo = document.querySelector("#input_sexo");
  let inputTelefono = document.querySelector("#input_telefono");
  let inputCorreo = document.querySelector("#input_correo");
  let inputAntecedentes = document.querySelector("#input_antecedentes");
  let inputMedicamentos = document.querySelector("#input_medicamentos");
  let inputAlergias = document.querySelector("#input_alergias");
  let inputDiscapacidaddes = document.querySelector("#input_discapacidades");

  

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

          nombeUsuario.innerHTML = `${userInfo.nombre}`;
          edadUsuario.innerHTML = `${userInfo.edad}` + ` años`;

          infoNombre.innerHTML = `${userInfo.nombre}`;
          infoEdad.innerHTML = `${userInfo.edad}`;
          infoSexo.innerHTML = `${userInfo.sexo}`;
          infoTelefono.innerHTML = `${userInfo.telefono}`;
          infoCorreo.innerHTML = `${userInfo.email}`;
          infoAntecedentes.innerHTML = `${userInfo.antecedentes}`;
          infoMedicamentos.innerHTML = `${userInfo.medicamentos}`;
          infoAlergias.innerHTML = `${userInfo.alergias}`;
          infoDiscapacidaddes.innerHTML = `${userInfo.discapacidades}`;

          inputNombre.value = `${userInfo.nombre}`;
          inputEdad.value = `${userInfo.edad}`;
          inputSexo.value = `${userInfo.sexo}`;
          inputTelefono.value = `${userInfo.telefono}`;
          inputCorreo.value = `${userInfo.email}`;
          inputAntecedentes.value = `${userInfo.antecedentes}`;
          inputMedicamentos.value = `${userInfo.medicamentos}`;
          inputAlergias.value = `${userInfo.alergias}`;
          inputDiscapacidaddes.value = `${userInfo.discapacidades}`;

      })
      .catch( err => {
          console.log( err.message );
      });

}

//Update info
function updateInfo(inputNombre, inputEdad, inputSexo, inputTelefono, inputCorreo, inputAntecedentes, inputMedicamentos, inputAlergias, inputDiscapacidades){
  let url = "/api/users/updateInfo";

  let data = {
      user_id : currentUserId,
      nombre : inputNombre,
      edad : inputEdad,
      sexo : inputSexo,
      telefono : inputTelefono,
      email : inputCorreo,
      antecedentes : inputAntecedentes,
      medicamentos : inputMedicamentos,
      alergias : inputAlergias,
      discapacidades : inputDiscapacidades

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
      let url2 = `/api/get-userby_id?_id=${currentUserId}`;

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
  let inputEdad = document.querySelector("#input_edad");
  let inputSexo = document.querySelector("#input_sexo");
  let inputTelefono = document.querySelector("#input_telefono");
  let inputCorreo = document.querySelector("#input_correo");
  let inputAntecedentes = document.querySelector("#input_antecedentes");
  let inputMedicamentos = document.querySelector("#input_medicamentos");
  let inputAlergias = document.querySelector("#input_alergias");
  let inputDiscapacidades = document.querySelector("#input_discapacidades");



  let infoNombre = document.querySelector("#info_nombre");
  let infoEdad = document.querySelector("#info_edad");
  let infoSexo = document.querySelector("#info_sexo");
  let infoTelefono = document.querySelector("#info_telefono");
  let infoCorreo = document.querySelector("#info_correo");
  let infoAntecedentes = document.querySelector("#info_antecedentes");
  let infoMedicamentos = document.querySelector("#info_medicamentos");
  let infoAlergias = document.querySelector("#info_alergias");
  let infoDiscapacidades = document.querySelector("#info_discapacidades");

  editBtn.addEventListener( 'click' , ( event ) => {

    if (inputNombre.classList.contains("hidden")){

      editBtn.innerHTML = "ACEPTAR";

      inputNombre.classList.remove("hidden");
      inputEdad.classList.remove("hidden");
      inputSexo.classList.remove("hidden");
      inputTelefono.classList.remove("hidden");
      inputCorreo.classList.remove("hidden");
      inputAntecedentes.classList.remove("hidden");
      inputMedicamentos.classList.remove("hidden");
      inputAlergias.classList.remove("hidden");
      inputDiscapacidades.classList.remove("hidden");

      infoNombre.classList.add("hidden");
      infoEdad.classList.add("hidden");
      infoSexo.classList.add("hidden");
      infoTelefono.classList.add("hidden");
      infoCorreo.classList.add("hidden");
      infoAntecedentes.classList.add("hidden");
      infoMedicamentos.classList.add("hidden");
      infoAlergias.classList.add("hidden");
      infoDiscapacidades.classList.add("hidden");
    }

    else{

      updateInfo(inputNombre.value, inputEdad.value, inputSexo.value,
         inputTelefono.value, inputCorreo.value, inputAntecedentes.value,
          inputMedicamentos.value, inputAlergias.value, inputDiscapacidades.value)


      editBtn.innerHTML = "EDITAR PERFIL";

      inputNombre.classList.add("hidden");
      inputEdad.classList.add("hidden");
      inputSexo.classList.add("hidden");
      inputTelefono.classList.add("hidden");
      inputCorreo.classList.add("hidden");
      inputAntecedentes.classList.add("hidden");
      inputMedicamentos.classList.add("hidden");
      inputAlergias.classList.add("hidden");
      inputDiscapacidades.classList.add("hidden");

      infoNombre.classList.remove("hidden");
      infoEdad.classList.remove("hidden");
      infoSexo.classList.remove("hidden");
      infoTelefono.classList.remove("hidden");
      infoCorreo.classList.remove("hidden");
      infoAntecedentes.classList.remove("hidden");
      infoMedicamentos.classList.remove("hidden");
      infoAlergias.classList.remove("hidden");
      infoDiscapacidades.classList.remove("hidden");
    }
  })
}


function init(){
  //Startup
  validateUser();

  watchEditBtn();
}


init();

