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
  
                    getConsultas(userJSON)
                    
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

  function getConsultas( responseJSON ){
    let url = `/api/get-consultasbyid?_id=${responseJSON._id}`;
    
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
        .then( responseJSON => {
            console.log(responseJSON)
            setConsultas( responseJSON);
        })
        .catch( err => {
            console.log( err.message );
        });
}


 function setConsultas( consultas)
 {

    let peso1 = document.querySelector("#peso1");
    let imc1 = document.querySelector("#imc1");
    let grasa1 = document.querySelector("#grasa1");
    let musc1 = document.querySelector("#musc1");
    let gv1 = document.querySelector("#gv1");
    let em1 = document.querySelector("#em1");
    let prof1 = document.querySelector("#prof1");

    peso1.innerHTML = consultas[0].peso
    imc1.innerHTML = consultas[0].masaCorporal
    grasa1.innerHTML = consultas[0].grasa
    musc1.innerHTML = consultas[0].musculo
    gv1.innerHTML = consultas[0].grasaVisceral
    em1.innerHTML = consultas[0].edadMetabolica
    prof1.innerHTML = consultas[0].profesional

    let peso2 = document.querySelector("#peso2");
    let imc2 = document.querySelector("#imc2");
    let grasa2 = document.querySelector("#grasa2");
    let musc2 = document.querySelector("#musc2");
    let gv2 = document.querySelector("#gv2");
    let em2 = document.querySelector("#em2");
    let prof2 = document.querySelector("#prof2");
    
    peso2.innerHTML = consultas[1].peso
    imc2.innerHTML = consultas[1].masaCorporal
    grasa2.innerHTML = consultas[1].grasa
    musc2.innerHTML = consultas[1].musculo
    gv2.innerHTML = consultas[1].grasaVisceral
    em2.innerHTML = consultas[1].edadMetabolica
    prof2.innerHTML = consultas[1].profesional

    let peso3 = document.querySelector("#peso3");
    let imc3 = document.querySelector("#imc3");
    let grasa3 = document.querySelector("#grasa3");
    let musc3 = document.querySelector("#musc3");
    let gv3 = document.querySelector("#gv3");
    let em3 = document.querySelector("#em3");
    let prof3 = document.querySelector("#prof23");
    
    peso3.innerHTML = consultas[2].peso
    imc3.innerHTML = consultas[2].masaCorporal
    grasa3.innerHTML = consultas[2].grasa
    musc3.innerHTML = consultas[2].musculo
    gv3.innerHTML = consultas[2].grasaVisceral
    em3.innerHTML = consultas[2].edadMetabolica
    prof3.innerHTML = consultas[2].profesional

 }

  
  function init(){
    //Startup
    validateUser();
}
  
  
  init();