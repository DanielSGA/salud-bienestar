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

                  setNombres( userJSON.nombre );
                  
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

function fetchCreateProfesional(nombre, email, password, calendario){
  let url = '/api/profesionales/signup';
  results = document.querySelector(".results");

    let data = {
        nombre,
        email,
        password,
        calendario
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
            populateProfessionalList();
        })
        .catch( err => {
            results.innerHTML = `<p class= "letras-rojas" >Hubo un problema al realizar el registro</p>`;
            console.log(err);
            populateProfessionalList();
        });
}

function watchAddProfesional(){
  let addBtn = document.querySelector( '.addBtn' );
  
  let inputNombre = document.querySelector("#input_nombre");
  let inputCorreo = document.querySelector("#input_correo");
  let inputPassword = document.querySelector("#input_password");
  let inputCalendario = document.querySelector("#input_calendario")


  addBtn.addEventListener( 'click' , ( event ) => {

    fetchCreateProfesional(inputNombre.value, inputCorreo.value, inputPassword.value, inputCalendario.value);
    inputNombre.value = "";
    inputCorreo.value = "";
    inputPassword.value = "";
    inputCalendario.value = "";
  })
}

function watchList()
{
    let list = document.querySelector("#profesionalList");


    let inputNombre = document.querySelector("#input_nombre_edit");
    let inputTelefono = document.querySelector("#input_telefono_edit");
    let inputCorreo = document.querySelector("#input_correo_edit");
    let inputCertificaciones = document.querySelector("#input_certificaciones_edit");
    let inputEspecialidades = document.querySelector("#input_especialidades_edit");
    let inputCalendario = document.querySelector("#input_calendario_edit")

     var elements = document.getElementsByName('optradio');
    var inputTitulo = '';
    elements.forEach(e => {
        if (e.checked) {
            //if radio button is checked, set sort style
            inputTitulo = e.value;
        }
    });


    list.addEventListener( 'change' , ( event ) => {
        //HAcer fetch del profesional con el id del value y poner los valores en los inputs.
        //Get info by user id
    let url = `/api/get-profesionalpor_id?_id=${list.value}`;
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
                inputNombre.value = `${userInfo.nombre}`;
            }
            else{
                inputNombre.value = ``;
            }
            
            if (userInfo.telefono != null){
                inputTelefono.value = `${userInfo.telefono}`;
            }
            else{
                inputTelefono.value = ``;
            }
            
            if (userInfo.email != null){
                inputCorreo.value = `${userInfo.email}`;
            }
            else{
                inputCorreo.value = ``;
            }
            
            if (userInfo.certificaciones != null){
                inputCertificaciones.value = `${userInfo.certificaciones}`;
            }
            else{
                inputCertificaciones.value = ``;
            }

            if (userInfo.especialidades != null){
                inputEspecialidades.value = `${userInfo.especialidades}`;
            }
            else{
                inputEspecialidades.value = ``;
            }

            if (userInfo.calendario != null){
                inputCalendario.value = `${userInfo.calendario}`;
            }
            else{
                inputCalendario.value = ``;
            }

            if (userInfo.titulo != null){
                //inputTitulo.checked = `${userInfo.titulo}`;

            elements.forEach(e => {
                if (e.value == userInfo.titulo) {
                    //if radio button is checked, set sort style
                    e.checked = true;
                    //console.log(e.value);
                }
                else{
                  e.checked = false;
                }
            });
            }
            else{
                inputTitulo.checked = ``;
            }
            
        })
        .catch( err => {
            console.log( err.message );
        });

    })
}


function watchPacienteList()
{
    let list = document.querySelector("#pacienteList");


    let inputNombre = document.querySelector("#input_nombre_edit_paciente");
    let inputCorreo = document.querySelector("#input_correo_edit_paciente");
    let inputEdad = document.querySelector("#input_edad_edit_paciente");
    let inputSexo = document.querySelector("#input_sexo_edit_paciente");
    let inputTelefono = document.querySelector("#input_telefono_edit_paciente");
    let inputAntecedentes = document.querySelector("#input_antecedentes_edit_paciente");
    let inputMedicamentos = document.querySelector("#input_medicamentos_edit_paciente");
    let inputAlergias = document.querySelector("#input_alergias_edit_paciente");
    let inputDiscapacidades = document.querySelector("#input_discapacidades_edit_paciente");

    list.addEventListener( 'change' , ( event ) => {
        //HAcer fetch del paciente con el id del value y poner los valores en los inputs.
        //Get info by user id
    let url = `/api/get-userby_id?_id=${list.value}`;
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
                inputNombre.value = `${userInfo.nombre}`;
            }
            else{
                inputNombre.value = ``;
            }
            
            if (userInfo.telefono != null){
                inputTelefono.value = `${userInfo.telefono}`;
            }
            else{
                inputTelefono.value = ``;
            }
            
            if (userInfo.email != null){
                inputCorreo.value = `${userInfo.email}`;
            }
            else{
                inputCorreo.value = ``;
            }
            
            if (userInfo.edad != null){
                inputEdad.value = `${userInfo.edad}`;
            }
            else{
                inputEdad.value = ``;
            }

            if (userInfo.sexo != null){
                inputSexo.value = `${userInfo.sexo}`;
            }
            else{
                inputSexo.value = ``;
            }

            if (userInfo.antecedentes != null){
                inputAntecedentes.value = `${userInfo.antecedentes}`;
            }
            else{
                inputAntecedentes.value = ``;
            }

            if (userInfo.medicamentos != null){
                inputMedicamentos.value = `${userInfo.medicamentos}`;
            }
            else{
                inputMedicamentos.value = ``;
            }

            if (userInfo.alergias != null){
                inputAlergias.value = `${userInfo.alergias}`;
            }
            else{
                inputAlergias.value = ``;
            }

            if (userInfo.discapacidades != null){
                inputDiscapacidades.value = `${userInfo.discapacidades}`;
            }
            else{
                inputDiscapacidades.value = ``;
            }
            
        })
        .catch( err => {
            console.log( err.message );
        });

    })
}

function populateProfessionalList()
{
    let list = document.querySelector("#profesionalList");
    list.innerHTML = `<option value = "0">ninguno</option>`;
    
    let url = '/api/profesionales';

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
        //console.log(responseJSON);
        for (let i = 0; i < responseJSON.length; i++){
            list.innerHTML += `<option value = "${responseJSON[i]._id}">${responseJSON[i].nombre}</option>`;
        }
    })
    .catch( err => {
        console.log(err);
    });
}

function popilatePacienteList()
{
    let list = document.querySelector("#pacienteList");
    list.innerHTML = `<option value = "0">ninguno</option>`;
    
    let url = '/api/users';

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
        //console.log(responseJSON);
        for (let i = 0; i < responseJSON.length; i++){
            list.innerHTML += `<option value = "${responseJSON[i]._id}">${responseJSON[i].nombre}</option>`;
        }
    })
    .catch( err => {
        console.log(err);
    });
}

function watchEditProfesionalesBtn(){
    let editBtn = document.querySelector( '.editProfesional' );
    let inputNombre = document.querySelector("#input_nombre_edit");
    let inputTelefono = document.querySelector("#input_telefono_edit");
    let inputCorreo = document.querySelector("#input_correo_edit");
    let inputCertificaciones = document.querySelector("#input_certificaciones_edit");
    let inputEspecialidades = document.querySelector("#input_especialidades_edit");
    let inputCalendario = document.querySelector("#input_calendario_edit");

    let list = document.querySelector("#profesionalList");

  
    //let inputTitulo = document.querySelector('input[name="optradio"]:checked');
    //let inputTitulo = document.querySelector('input[name = optradio]:checked').value
  
  
    let formInputTitulo = document.querySelector(".formTitulo");
  
    editBtn.addEventListener( 'click' , ( event ) => {
  
      var elements = document.getElementsByName('optradio');
      var inputTitulo;
      elements.forEach(e => {
          if (e.checked) {
              //if radio button is checked, set sort style
              inputTitulo = e.value;
              e.checked = false;
          }
      });

      updateInfoProf(list.value, inputNombre.value, inputTelefono.value, inputCorreo.value, inputCertificaciones.value, inputEspecialidades.value, inputCalendario.value, inputTitulo);
      inputNombre.value = "";
      inputTelefono.value = "";
      inputCorreo.value = "";
      inputCertificaciones.value = "";
      inputEspecialidades.value = "";
      inputCalendario.value = "";
      list.value = "ninguno";
      

    })
  }

  //Update info
function updateInfoProf(id, inputNombre, inputTelefono, inputCorreo, inputCertificaciones, inputEspecialidades, inputCalendario, inputTitulo){

    results = document.querySelector(".results2");

    let url = "/api/profesionales/updateInfo";
  
    let data = {
        profesional_id : id,
        nombre : inputNombre,
        telefono : inputTelefono,
        email : inputCorreo,
        certificaciones : inputCertificaciones,
        especialidades : inputEspecialidades,
        calendario : inputCalendario,
        titulo : inputTitulo
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
        let url2 = `/api/get-profesionalpor_id?_id=${id}`;
  
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
                results.innerHTML = `<p class = "letras-azules">Cambios Exitosos</p>`;
  
            })
            .catch( err => {
                console.log( err.message );
                results.innerHTML = `<p class= "letras-rojas" >Hubo un problema al realizar los cambios</p>`;
                console.log(err);
            });
  
    })
    .catch( err => {
        console.log( err.message );
    });
  }

  function watchEditPacientesBtn(){
    let editBtn = document.querySelector( '.editPaciente' );
    
    let inputNombre = document.querySelector("#input_nombre_edit_paciente");
    let inputCorreo = document.querySelector("#input_correo_edit_paciente");
    let inputEdad = document.querySelector("#input_edad_edit_paciente");
    let inputSexo = document.querySelector("#input_sexo_edit_paciente");
    let inputTelefono = document.querySelector("#input_telefono_edit_paciente");
    let inputAntecedentes = document.querySelector("#input_antecedentes_edit_paciente");
    let inputMedicamentos = document.querySelector("#input_medicamentos_edit_paciente");
    let inputAlergias = document.querySelector("#input_alergias_edit_paciente");
    let inputDiscapacidades = document.querySelector("#input_discapacidades_edit_paciente");

    let list = document.querySelector("#pacienteList");

  
    //let inputTitulo = document.querySelector('input[name="optradio"]:checked');
    //let inputTitulo = document.querySelector('input[name = optradio]:checked').value
  
    editBtn.addEventListener( 'click' , ( event ) => {

      updateInfoPaciente(list.value, inputNombre.value, inputTelefono.value, inputCorreo.value, inputEdad.value, inputSexo.value, inputAntecedentes.value, inputMedicamentos.value, inputAlergias.value, inputDiscapacidades.value);
      inputNombre.value = "";
      inputTelefono.value = "";
      inputCorreo.value = "";
      inputEdad.value = "";
      inputSexo.value = "";
      inputAntecedentes.value = "";
      inputMedicamentos.value = "";
      inputAlergias.value = "";
      inputDiscapacidades.value = "";

      list.value = "ninguno";
    })
  }


    //Update info
function updateInfoPaciente(id, inputNombre, inputTelefono, inputCorreo, inputEdad, inputSexo, inputAntecedentes, inputMedicamentos, inputAlergias, inputDiscapacidades){

    results = document.querySelector(".results3");

    let url = "/api/users/updateInfo";
  
    let data = {
        user_id : id,
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
        let url2 = `/api/get-userby_id?_id=${id}`;
  
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
                results.innerHTML = `<p class = "letras-azules">Cambios Exitosos</p>`;
  
            })
            .catch( err => {
                console.log( err.message );
                results.innerHTML = `<p class= "letras-rojas" >Hubo un problema al realizar los cambios</p>`;
                console.log(err);
            });
  
    })
    .catch( err => {
        console.log( err.message );
    });
  }


function init(){
  //Startup
  validateUser();
  populateProfessionalList();
  popilatePacienteList();
  watchList();
  watchPacienteList();
  watchEditProfesionalesBtn();
  watchEditPacientesBtn();

  watchAddProfesional();
}


init();

