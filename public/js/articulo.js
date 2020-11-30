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

function processID(){
    var parameters = location.search.substring(1);
    console.log(parameters);

    var temp = parameters.split("=");
    id = unescape(temp[1]);
    console.log(id);
    return id;
}

function setArticulos( idArticle ){

    let sectArticulos = document.querySelector("#firstrow");

    let url = `/api/get-articulopor_id?_id=${idArticle}`;

    console.log(url);

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

                    if(articles[k].category === "Medicina general"){

                    sectArticulos.innerHTML += `
                    
                    <div class="row">
                    <div class="col" style="margin-top: 50px; margin-left: 40px;">
                        <img src="../img/general.png" alt="" class="cat-img">
                        <span class="title-cat-art">${articles[k].title}</span>
                    </div>
                    </div>
                    <!--Categoria-->
                    <div class="row">
                        <div class="col">
                            <div class="category">${articles[k].category}</div>
                        </div>
                    </div>
                    <!--Summary-->
                    <div class="row">
                        <div class="col">
                            <div class="summary-art">${articles[k].summary}</div>
                        </div>
                    </div>
                    <!--Texto-->
                    <div class="row">
                        <div class="col">
                            <div class="art-text">${articles[k].text}</div>
                        </div>
                    </div>
                    <!--Video-->
                    <iframe width="560" height="315" src="${articles[k].video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-left: 48px;"></iframe>
                    `
                    }
                    if(articles[k].category === "Psicología"){

                        sectArticulos.innerHTML += `
                        
                        <div class="row">
                        <div class="col" style="margin-top: 50px; margin-left: 40px;">
                            <img src="../img/psi.png" alt="" class="cat-img">
                            <span class="title-cat-art">${articles[k].title}</span>
                        </div>
                        </div>
                        <!--Categoria-->
                        <div class="row">
                            <div class="col">
                                <div class="category">${articles[k].category}</div>
                            </div>
                        </div>
                        <!--Summary-->
                        <div class="row">
                            <div class="col">
                                <div class="summary-art">${articles[k].summary}</div>
                            </div>
                        </div>
                        <!--Texto-->
                        <div class="row">
                            <div class="col">
                                <div class="art-text">${articles[k].text}</div>
                            </div>
                        </div>
                        <!--Video-->
                        <iframe width="420" height="345" src="${articles[k].video}">
                        </iframe>
                        `
                    }
                    if(articles[k].category === "Nutrición"){

                        sectArticulos.innerHTML += `
                        
                        <div class="row">
                        <div class="col" style="margin-top: 50px; margin-left: 40px;">
                            <img src="../img/nutri.png" alt="" class="cat-img">
                            <span class="title-cat-art">${articles[k].title}</span>
                        </div>
                        </div>
                        <!--Categoria-->
                        <div class="row">
                            <div class="col">
                                <div class="category">${articles[k].category}</div>
                            </div>
                        </div>
                        <!--Summary-->
                        <div class="row">
                            <div class="col">
                                <div class="summary-art">${articles[k].summary}</div>
                            </div>
                        </div>
                        <!--Texto-->
                        <div class="row">
                            <div class="col">
                                <div class="art-text">${articles[k].text}</div>
                            </div>
                        </div>
                        <!--Video-->
                        <iframe width="560" height="315" src="${articles[k].video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-left: 80px;"></iframe>
                        </iframe>
                        `
                    }
                    if(articles[k].category === "Ginecología"){

                        sectArticulos.innerHTML += `
                        
                        <div class="row">
                        <div class="col" style="margin-top: 50px; margin-left: 40px;">
                            <img src="../img/gine.png" alt="" class="cat-img">
                            <span class="title-cat-art">${articles[k].title}</span>
                        </div>
                        </div>
                        <!--Categoria-->
                        <div class="row">
                            <div class="col">
                                <div class="category">${articles[k].category}</div>
                            </div>
                        </div>
                        <!--Summary-->
                        <div class="row">
                            <div class="col">
                                <div class="summary-art">${articles[k].summary}</div>
                            </div>
                        </div>
                        <!--Texto-->
                        <div class="row">
                            <div class="col">
                                <div class="art-text">${articles[k].text}</div>
                            </div>
                        </div>
                        <!--Video-->
                        <iframe width="420" height="345" src="${articles[k].video}">
                        </iframe>
                        `
                    }
                    if(articles[k].category === "Pediatría"){

                        sectArticulos.innerHTML += `
                        
                        <div class="row">
                        <div class="col" style="margin-top: 50px; margin-left: 40px;">
                            <img src="../img/pediatra.png" alt="" class="cat-img">
                            <span class="title-cat-art">${articles[k].title}</span>
                        </div>
                        </div>
                        <!--Categoria-->
                        <div class="row">
                            <div class="col">
                                <div class="category">${articles[k].category}</div>
                            </div>
                        </div>
                        <!--Summary-->
                        <div class="row">
                            <div class="col">
                                <div class="summary-art">${articles[k].summary}</div>
                            </div>
                        </div>
                        <!--Texto-->
                        <div class="row">
                            <div class="col">
                                <div class="art-text">${articles[k].text}</div>
                            </div>
                        </div>
                        <!--Video-->
                        <iframe width="420" height="345" src="${articles[k].video}">
                        </iframe>
                        `
                    }
                    if(articles[k].category === "Dermatología"){

                        sectArticulos.innerHTML += `
                        
                        <div class="row">
                        <div class="col" style="margin-top: 50px; margin-left: 40px;">
                            <img src="../img/derma.png" alt="" class="cat-img">
                            <span class="title-cat-art">${articles[k].title}</span>
                        </div>
                        </div>
                        <!--Categoria-->
                        <div class="row">
                            <div class="col">
                                <div class="category">${articles[k].category}</div>
                            </div>
                        </div>
                        <!--Summary-->
                        <div class="row">
                            <div class="col">
                                <div class="summary-art">${articles[k].summary}</div>
                            </div>
                        </div>
                        <!--Texto-->
                        <div class="row">
                            <div class="col">
                                <div class="art-text">${articles[k].text}</div>
                            </div>
                        </div>
                        <!--Video-->
                        <iframe width="560" height="315" src="${articles[k].video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `
                    }
                    
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
    setArticulos(processID());
}
  
init();