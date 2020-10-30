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


function setProfesionales( titulo ){

    let sectProfesionales = document.querySelector("#firstrow");

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

            sectProfesionales.innerHTML = ''

            if (profesionales!= null){
                for (k = 0; k< profesionales.length; k++) {

                    sectProfesionales.innerHTML += `
                    
                    <div class="col">
                    <a class = "a2" href ="/pages/perfil_profesional_paciente.html"> 
                            <div class="prof-element container">
                                <div class="row" style="padding: 0;">

                                    <div class="col-4" style="padding: 6px 0 6px 0;">
                                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg" class="rounded-circle z-depth-0 photo" alt="avatar image" height="60">
                                    </div>
                                    <div class="col-8" style="padding: 8px 0 8px 0; text-align: left;">
                                        <div class="prof-name">Dr. ${profesionales[k].nombre}</div>
                                        <div class="prof-spec">${profesionales[k].titulo}</div>
                                        <div class="prof-info">Especialista en ${profesionales[k].especialidades}</div>
                                    </div>

                                </div>
                            </div>
                            </a>

                        </div>
                    `
                }
            }

            
      
        })
        .catch( err => {
            console.log( err.message );
            sectProfesionales.innerHTML = ''
        });


}

function navigationBarEvent(){
    let navigationElements = document.getElementsByClassName("sect")

    for (let i = 0; i < navigationElements.length; i++){
        navigationElements[i].addEventListener("click", (event) => {

            //Esconde la que está desplegada actualmente.
            let selectedSection = document.querySelector(".actual");
            selectedSection.classList.remove("actual");
            selectedSection.classList.remove("text-actual");


            //event.target se usa para targetear al elemento al que se le hizo click.
            let currentElement = event.target.id;

            
            console.log(currentElement)
            
            //También podría ser ("." + currentElement + "Section")
            let elementToShow = document.querySelector("#" + currentElement);
            //Mostrar al que se le hizo click
            elementToShow.classList.add("actual");
            elementToShow.classList.add("text-actual");

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
  