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
    //Startup
    setArticulos(processID());
}
  
init();