var currentUserId = ";"

// Buscador
function openSearch() {
  document.getElementById("overlay").style.display = "block";
}

function closeSearch(){
  document.getElementById("overlay").style.display = "none";
}
// Fin de Buscador

//Post article
function postArticle(inputTitulo, inputSummary, inputTexto, inputCategory){
    console.log("El que mandas:")
    console.log(inputCategory)
    let url = "/api/articles/createArticle";
  
    let data = {
        title : inputTitulo,
        summary : inputSummary,
        text : inputTexto,
        category : inputCategory
    }
  
    let settings = {
    method : 'POST',
    headers : {
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
        window.location.href = "/pages/library_main.html";
    })
    .catch( err => {
        console.log( err.message );
    });
  }


function watchSendBtn(){
console.log('Comienzo a vigilar');
let sendBtn = document.querySelector( '.sendBtn' );

let inputTitulo = document.querySelector("#input_title");
let inputSummary = document.querySelector("#input_summary");
let inputTexto = document.querySelector("#input_text");

sendBtn.addEventListener( 'click' , ( event ) => {

    console.log('Clicked');
    var elements = document.getElementsByName('optradio');
    var inputCategory;
    elements.forEach(e => {
        if (e.checked) {
            //if radio button is checked, set sort style
            inputCategory = e.value;
        }
    });

    postArticle(inputTitulo.value, inputSummary.value, inputTexto.value, inputCategory)
})
}

function init(){
    //Startup
    watchSendBtn();
    console.log('iniciado');
}

init();