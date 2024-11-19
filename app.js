'use strict';

const switcher = document.querySelector('.btn');

switcher.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if(className == "light-theme") {
        this.textContent = "Dark";
    } else {
        this.textContent = "Light" ;
    }

    console.log('current class name: ' + className);
});

let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 4;

loadMoreBtn.onclick = ()=>{

    let boxes = [...document.querySelectorAll('.box-container .box')];
    for(var i = currentItem; i< currentItem + 4; i++){
        boxes[i].style.display = 'inline-block';
    }
    currentItem += 4;
    if(currentItem >= boxes.length){
        loadMoreBtn.style.display ='none';
    }
}

//carrito

const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const comprarcarrito = document.getElementById('comprar-carrito');

cargarEventListeners();

function cargarEventListeners(){
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarcarrito);
}

function comprarElemento(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        cantidad: 1,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento)
    //comparar(infoElemento)
   
}

// function comparar (elemento){
//     let datos = document.getElementsByTagName("tr")
//     for(let i = 1, celda =  new Array(); i < datos.length; i++){
//          celda = datos[i].cells[1];
//         console.log(celda)
//      }

// }


function insertarCarrito(elemento){
    console.log(lista);
    const row = document.createElement("tr");
    row.innerHTML = `
    
        <td>
            <img src = "${elemento.imagen}" width = 50 />
        </td>

        <td>
          ${elemento.titulo}
        </td>

        <td>
           ${elemento.precio}
        </td>
        
        <td>
           ${elemento.cantidad + 2}
        </td>

        <td>
           ${elemento.precio}
        </td>

        <td>
            <a href="#" class = "borrar" data-id = "${elemento.id}" > X </a>
        </td>
    `;
    lista.appendChild(row);
    
}

function eliminarElemento(e){
    e.preventDefault();
    let elemento,
        elementoId;

    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarcarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false;
}
