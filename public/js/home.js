var currentUserId = ";"
var selectedSection = ";"


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
  
                    setProfesionales( "Medico General");
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
      let nombre2 = document.querySelector("#nombreUsuario2");

      nombre1.innerHTML = nombreUsuario;
      nombre2.innerHTML = `Bienvenido, ${nombreUsuario}`;

  }


  function setProfesionales( titulo ){

    let profesionalesrow1 = document.querySelector("#row1");
    let profesionalesrow2 = document.querySelector("#row2");

    let url = `/api/get-profesionalpor_titulo?titulo=${titulo}`;

    let settings = {
        method : 'GET'}


        fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( profesionales => {

            profesionalesrow1.innerHTML = ''
            profesionalesrow2.innerHTML = ''

            

            if (profesionales!= null){
                for (k = 0; k< profesionales.length; k++) {

                    if (k > 2 && k < 6)
                    {
                        profesionalesrow1.innerHTML += `
                    <div class="col doc-div" style="text-align: center; padding: 0;">
                    <a class = "a2" href="perfil_profesional_vistaPaciente.html?id=${profesionales[k]._id}">

                                        <button class="doc-button"><img src="../img/medico.png" class="rounded-circle z-depth-0" alt="avatar image" height="45"></button>
                                        <div class="esp-doctor">Dr. ${profesionales[k].nombre}</div>
                                    </div></div>
                                    </a>
                                    </div>
                    `
                    }

                    else if (k < 6)
                    {
                        profesionalesrow2.innerHTML += `
                    
                    <div class="col doc-div" style="text-align: center; padding: 0;">
                    <a class = "a2" href="perfil_profesional_vistaPaciente.html?id=${profesionales[k]._id}">
                                        <button class="doc-button"><img src="../img/medico.png" class="rounded-circle z-depth-0" alt="avatar image" height="45"></button>
                                        <div class="esp-doctor">Dr. ${profesionales[k].nombre}</div>
                                    </div></div>
                                    </a>
                                    </div>
                    `
                    }
                }
            }

            
      
        })
        .catch( err => {
            console.log( err.message );
            profesionalesrow1.innerHTML = ''
            profesionalesrow2.innerHTML = ''
        });


}

function navigationBarEvent(){
    let navigationElements = document.getElementsByClassName("sect")
    

    for (let i = 0; i < navigationElements.length; i++){
        navigationElements[i].addEventListener("click", (event) => {

            //Esconde la que está desplegada actualmente.
            let selectedSection = document.querySelector(".actual2");
            selectedSection.classList.remove("actual2");
            //selectedSection.classList.remove("text-actual");


            //event.target se usa para targetear al elemento al que se le hizo click.
            let currentElement = event.target.id;

            
            
            //También podría ser ("." + currentElement + "Section")
            let elementToShow = document.querySelector("#" + currentElement);
            //Mostrar al que se le hizo click
            elementToShow.classList.add("actual2");
            //elementToShow.classList.add("text-actual");

            if (currentElement == "MedicoGeneral"){
                currentElement = "Medico General"
            }

            setProfesionales(currentElement)

        });
    }

}

  function init(){
    //Startup
    validateUser();
    navigationBarEvent();
}
  
  
  init();
  