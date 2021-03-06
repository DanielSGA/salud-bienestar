var currentUserId = ";"

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



function setArticulos( categoria ){

    let sectArticulos = document.querySelector("#firstrow");

    let url = `/api/get-articulopor_categoria?categoria=${categoria}`;

    let settings = {
        method : 'GET'}


        fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( articles => {

            sectArticulos.innerHTML = ''

            if (articles!= null){
                for (k = 0; k< articles.length; k++) {

                    sectArticulos.innerHTML += `
                    
                    <div class="col-12">
                            <div class="article-box">
                                <a href="articulo.html?id=${articles[k]._id}" class="a2">
                                    <div class="prof-name" style="margin-bottom: 8px;">${articles[k].title}</div>
                                    <div class="prof-spec" style="margin-bottom: 8px;">${articles[k].category}</div>
                                    <div class="prof-info">${articles[k].summary}</div>
                                </a>

                            </div>
                        </div>
                    `
                }
            }

            
      
        })
        .catch( err => {
            console.log( err.message );
            sectArticulos.innerHTML = ''
        });


}

function init(){

    validateUser();

    //Startup
    let temp1 = document.querySelector("#general");
    let temp2 = document.querySelector("#psi");
    let temp3 = document.querySelector("#nutri");
    let temp4 = document.querySelector("#gine");
    let temp5 = document.querySelector("#pediatra");
    let temp6 = document.querySelector("#derma");

    if(temp1 != null) {
        var categoria = "Medicina general";
        setArticulos(categoria);
    }

    if(temp2 != null) {
        var categoria = "Psicología";
        setArticulos(categoria);
    }

    if(temp3 != null) {
        var categoria = "Nutrición";
        setArticulos(categoria);
    }

    if(temp4 != null) {
        var categoria = "Ginecología";
        setArticulos(categoria);
    }

    if(temp5 != null) {
        var categoria = "Pediatría";
        setArticulos(categoria);
    }

    if(temp6 != null) {
        var categoria = "Dermatología";
        setArticulos(categoria);
    }
}
  
  
init();