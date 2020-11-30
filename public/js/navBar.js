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
            console.log(currentUserId)
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
                    setNavBarUser( userJSON.nombre );
                    
                })
                .catch( err => {
                    let url = `/api/get-profesionalpor_id?_id=${currentUserId}`;
  
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
        
                            setNavBarProfesional( userJSON.nombre );
                            
                        })
                        .catch( err => {
                            
                        });
                });
        })
        .catch( err => {
            console.log( err.message );
            window.location.href = "../index.html";
        });
  }

  function setNavBarUser( nombre )
  {
    let navBar = document.querySelector("#nav");
    

    navBar.innerHTML = `
    <!-- Logo-->
    <div>
        <a class="navbar-brand" href="#">
            <img src="../img/logo2.jpg" class="circulo-logo" id="logo-nav">
        </a>
    </div>
    <!--End Logo-->
    <ul>
        <li class="columnas-display-grid">
            <div>
                <a href=""><i class="fa fa-home" aria-hidden="true"></i></a>
            </div>
            <div>
                <a href="home.html" class="active texto-nav"><p>Inicio</p></a>
            </div>
        </li>
        <li class="columnas-display-grid">
            <div>
                <a href=""><i class="fa fa-user-md" aria-hidden="true"></i></a> 
            </div>
            <div>
                <a href="listado.html" class="texto-nav"><span>Profesionales de la salud</span></a>
            </div>
        </li>
        <li class="columnas-display-grid">
            <div>
                <a href=""><i class="fa fa-file-text-o" aria-hidden="true"></i></a>
            </div>
            <div>
                <a href="" class="texto-nav"><p>Seguimiento</p></a>
            </div>
        </li>
        <li class="columnas-display-grid">
            <div>
                <a href=""><i class="fa fa-book" aria-hidden="true"></i></a>
            </div>
            <div>
                <a href="library_main_UserView.html" class="texto-nav"><p>Bibliotecas</p></a>
            </div>
        </li>
    </ul>


    
    <!--Avatar -->
    <ul class="navbar-nav ml-auto nav-flex-icons" style="margin-top: 200px;">
        <li class="nav-item avatar columnas-avatar-nav">
            <div>
                <a class="nav-link p-0" href="#" id="avatar-nav">
                    <img src="../img/usuario.png" class="rounded-circle z-depth-0" alt="avatar image" height="30">
                </a>
            </div>
            <div class="texto-nav">
                <a href="perfil.html" id="nombreUsuario" class="texto-nav"> ${nombre}</a>
            </div>
        </li>
    </ul>
        <!--Avatar -->
    `

  }

  function setNavBarProfesional( nombre )
  {
    let navBar = document.querySelector("#nav");

    navBar.innerHTML = `
    <!-- Logo-->
                <div>
                  <a class="navbar-brand" href="#">
                    <img src="../img/logo2.jpg" class="circulo-logo" id="logo-nav">
                  </a>
                </div>
                <!--End Logo-->
                <ul style="margin-right: 16px;">
                    <li class="columnas-display-grid">
                        <div>
                            <a href="perfil_profesional.html"><i class="fa fa-home" aria-hidden="true"></i></a>
                        </div>
                        <div>
                            <a href="perfil_profesional.html" class="active texto-nav"><p>Inicio</p></a>
                        </div>
                    </li>
                    <li class="columnas-display-grid" hidden>
                        <div>
                            <a href="seguimiento.html"><i class="fa fa-file-text-o" aria-hidden="true"></i></a>
                        </div>
                        <div>
                            <a href="seguimiento.html" class="texto-nav"><p>Seguimiento</p></a>
                        </div>
                    </li>
                    <li class="columnas-display-grid">
                        <div>
                            <a href="library_main.html"><i class="fa fa-book" aria-hidden="true"></i></a>
                        </div>
                        <div>
                            <a href="library_main.html" class="texto-nav"><p>Bibliotecas</p></a>
                        </div>
                    </li>
                    <!--
                    <li class="columnas-display-grid">
                        <div>
                            <a><i class="fa fa-search" onclick="openSearch()" aria-hidden="true"></i></a>
                        </div>
                        <div>
                            <a class="texto-nav" onclick="openSearch()"><p>Buscador</p></a>
                        </div>
                             Al presionar el buscador se dezpliega esto
                            <div class="overlay" id="overlay">
                                <button onclick="closeSearch()" class="cerrarBusqueda">X</button>
                                <div class="overlay-content">
                                    <form id="form" action="">
                                        <input type="text" name="" placeholder="¿Qué médico busca?">
                                        <a type="submit" onclick=""><i class="fa boton fa-2x overlay-fa fa-search "></i></a>
                                    </form>
                                </div>
                            </div>
                             End del buscador
                    </li>-->
                </ul>


              
                <!--Avatar -->
                <ul class="navbar-nav ml-auto nav-flex-icons" style="margin-top: 200px;">
                    <li class="nav-item avatar columnas-avatar-nav" style= "justify-content: center;">
                        <div>
                            <a class="nav-link p-0" href="perfil_profesional.html" id="avatar-nav">
                                <img src="../img/usuario.png" class="rounded-circle z-depth-0" alt="avatar image" height="30">
                            </a>
                        </div>
                        <div class="texto-nav">
                            <a href="perfil_profesional.html" id="nombreUsuario" class= "texto-nav">${nombre}</a>
                        </div>
                    </li>
                </ul>
    
    `

  }


  function init(){
    //Startup
    validateUser();
}
  
  
  init();
  