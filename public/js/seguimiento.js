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

function fetchProfesionalName( profID)
 {
     //Get info by user id
  let url = `/api/get-profesionalpor_id?_id=${profID}`;
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
          return userInfo
      })
      .catch( err => {
          console.log( err.message );
      });
 }
  

 function setConsultas( consultas)
 {
     consultas.reverse();
     
    let peso0 = document.querySelector("#peso0");
    let imc0 = document.querySelector("#imc0");
    let grasa0 = document.querySelector("#grasa0");
    let musc0 = document.querySelector("#musc0");
    let gv0 = document.querySelector("#gv0");
    let em0 = document.querySelector("#em0");
    let prof0 = document.querySelector("#prof0");


    last = consultas.length-1

    peso0.innerHTML = consultas[last].peso
    imc0.innerHTML = consultas[last].masaCorporal
    grasa0.innerHTML = consultas[last].grasa
    musc0.innerHTML = consultas[last].musculo
    gv0.innerHTML = consultas[last].grasaVisceral
    em0.innerHTML = consultas[last].edadMetabolica
    prof0.innterText = fetchProfesionalName(consultas[0].profesional)

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
    prof1.innterText = fetchProfesionalName(consultas[0].profesional)
    

    ////////////////////////////////////////////////////

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
    prof2.innerHTML = fetchProfesionalName(consultas[1].profesional)
    ////////////////////////////////////////////////////

    let peso3 = document.querySelector("#peso3");
    let imc3 = document.querySelector("#imc3");
    let grasa3 = document.querySelector("#grasa3");
    let musc3 = document.querySelector("#musc3");
    let gv3 = document.querySelector("#gv3");
    let em3 = document.querySelector("#em3");
    let prof3 = document.querySelector("#prof3");
    
    peso3.innerHTML = consultas[2].peso
    imc3.innerHTML = consultas[2].masaCorporal
    grasa3.innerHTML = consultas[2].grasa
    musc3.innerHTML = consultas[2].musculo
    gv3.innerHTML = consultas[2].grasaVisceral
    em3.innerHTML = consultas[2].edadMetabolica
    prof3.innerHTML = fetchProfesionalName(consultas[2].profesional)

    ////////////////////////////////////////////////////

    let peso4 = document.querySelector("#peso4");
    let imc4 = document.querySelector("#imc4");
    let grasa4 = document.querySelector("#grasa4");
    let musc4 = document.querySelector("#musc4");
    let gv4 = document.querySelector("#gv4");
    let em4 = document.querySelector("#em4");
    let prof4 = document.querySelector("#prof4");
    
    peso4.innerHTML = consultas[3].peso
    imc4.innerHTML = consultas[3].masaCorporal
    grasa4.innerHTML = consultas[3].grasa
    musc4.innerHTML = consultas[3].musculo
    gv4.innerHTML = consultas[3].grasaVisceral
    em4.innerHTML = consultas[3].edadMetabolica
    prof4.innerHTML = fetchProfesionalName(consultas[3].profesional)

    ////////////////////////////////////////////////////

    let peso5 = document.querySelector("#peso5");
    let imc5 = document.querySelector("#imc5");
    let grasa5 = document.querySelector("#grasa5");
    let musc5 = document.querySelector("#musc5");
    let gv5 = document.querySelector("#gv5");
    let em5 = document.querySelector("#em5");
    let prof5 = document.querySelector("#prof5");
    
    peso5.innerHTML = consultas[4].peso
    imc5.innerHTML = consultas[4].masaCorporal
    grasa5.innerHTML = consultas[4].grasa
    musc5.innerHTML = consultas[4].musculo
    gv5.innerHTML = consultas[4].grasaVisceral
    em5.innerHTML = consultas[4].edadMetabolica
    prof5.innerHTML = fetchProfesionalName(consultas[4].profesional)

    ////////////////////////////////////////////////////

    let peso6 = document.querySelector("#peso6");
    let imc6 = document.querySelector("#imc6");
    let grasa6 = document.querySelector("#grasa6");
    let musc6 = document.querySelector("#musc6");
    let gv6 = document.querySelector("#gv6");
    let em6 = document.querySelector("#em6");
    let prof6 = document.querySelector("#prof6");
    
    peso6.innerHTML = consultas[5].peso
    imc6.innerHTML = consultas[5].masaCorporal
    grasa6.innerHTML = consultas[5].grasa
    musc6.innerHTML = consultas[5].musculo
    gv6.innerHTML = consultas[5].grasaVisceral
    em6.innerHTML = consultas[5].edadMetabolica
    prof6.innerHTML = fetchProfesionalName(consultas[5].profesional)
 }


 
  function init(){
    //Startup
    validateUser();
}
  
  
  init();