const slider = document.querySelector('#slider');
let sliderSection = document.querySelectorAll('.slider__section');
let sliderSectionLast = sliderSection[sliderSection.length -1];
let containerSlider = document.querySelector('.container-slider');
let anchoVentana = window.innerWidth;


const btnLeft = document.querySelector('#btn-left');
const btnRight = document.querySelector('#btn-right');
let fondoPagina = document.querySelector('.fondo-pagina');

let avanceAutomaticoPausa = false;


let fondoImagen = slider.children[0];
let imagenSeccion = fondoImagen.firstElementChild.src;
fondoPagina.style.backgroundImage = `url(${imagenSeccion})`;


let contenedorTitulo = document.querySelector('.contenedor-titulo');
let tituloSeccion = document.querySelector('.titulo-seccion');
let decoracionTitulo = document.querySelector('.decoracion-titulo');
let textoSeccion = document.querySelector('.texto-seccion');
let iconoAnimacion = document.querySelector('.icono-animacion');

let tituloActual;
let textoActual;
let imagenactual;
let srcImagenActual
let srcActual;
let fondoActual;

let queryMovil;
let querypc;

function tamañosContenido(movil, pc) {

    if (anchoVentana <= 1299) {
        
        tituloActual = slider.children[movil].querySelector('.movil-titulo-imagen');
        tituloSeccion.textContent = tituloActual.textContent;
    
        textoActual = slider.children[movil].querySelector('.movil-descripcion-imagen');
        textoSeccion.textContent = textoActual.textContent;

        imagenactual = slider.children[movil].querySelector('.movil-imagen');
        srcImagenActual = imagenactual.getAttribute('src');
        
        srcActual = slider.children[movil].querySelector('.slider__img');
        srcActual.src = srcImagenActual;
        
        fondoPagina.style.backgroundImage = `url(${srcImagenActual})`;
    
    }else{
        tituloActual = slider.children[pc].querySelector('h1');
        tituloSeccion.textContent = tituloActual.textContent;
    
        textoActual = slider.children[pc].querySelector('p');
        textoSeccion.textContent = textoActual.textContent;

        

    }
}
tamañosContenido(0,0);


let avanceIcono = false;


slider.insertAdjacentElement('afterbegin', sliderSectionLast);


function next() {
    let fondoImagen = slider.children[2];
    let imagenSeccion = fondoImagen.firstElementChild.src;
    
    fondoPagina.style.backgroundImage = `url(${imagenSeccion})`;

    
    tamañosContenido(2,2);

    
    let sliderSectionFirst = document.querySelectorAll('.slider__section')[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 1s ease";

    avanceIcono = true;
    
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend', sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 1000);

    cambioIcono();

    btnLeft.style.pointerEvents = 'none';
    btnRight.style.pointerEvents = 'none';

    setTimeout(() => {
        btnLeft.style.pointerEvents = 'all';
        btnRight.style.pointerEvents = 'all';
    }, 1000);
}

function prev() {
    let fondoImagen = slider.children[0];
    let imagenSeccion = fondoImagen.firstElementChild.src;
    
    fondoPagina.style.backgroundImage = `url(${imagenSeccion})`;

    tamañosContenido(0,0);

    
    let sliderSection = document.querySelectorAll('.slider__section');
    let sliderSectionLast = sliderSection[sliderSection.length -1];
    slider.style.marginLeft = "0%";
    slider.style.transition = "all 1s ease";

    avanceIcono = true;
    
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('afterbegin', sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 1000);

    cambioIcono();

}

btnRight.addEventListener('click', ()=>{
    next();
    clearInterval(avanceAutomatico);

    btnLeft.style.pointerEvents = 'none';
    btnRight.style.pointerEvents = 'none';

    setTimeout(() => {
        btnLeft.style.pointerEvents = 'all';
        btnRight.style.pointerEvents = 'all';
    }, 1000);
    
    if (avanceAutomaticoPausa == false) {
        iniciarIntervalo();
    }
    
});

btnLeft.addEventListener('click', ()=>{
    prev();
    clearInterval(avanceAutomatico);

    btnLeft.style.pointerEvents = 'none';
    btnRight.style.pointerEvents = 'none';

    setTimeout(() => {
        btnLeft.style.pointerEvents = 'all';
        btnRight.style.pointerEvents = 'all';
    }, 1000);


    if (avanceAutomaticoPausa == false) {
        iniciarIntervalo();
    }
});


let avanceAutomatico; 

function iniciarIntervalo() {
    
    avanceAutomatico = setInterval(() => {
        next();
    }, 5000);
}

iniciarIntervalo();


window.addEventListener('load', ()=>{
    contenedorTitulo.classList.add('contenedor-titulo-activado');
    decoracionTitulo.classList.add('decoracion-titulo-activado');
    textoSeccion.classList.add('texto-seccion-activado');
});


let numeroIcono = 1;

function cambioIcono() {
    
    if (avanceIcono == true) {
    
        numeroIcono ++;
        iconoAnimacion.style.backgroundImage = `url(gif-animacion/icono${numeroIcono}.gif)`;
        
        if (numeroIcono == 6) {
            numeroIcono = 0;
        }
    }
}


let btnPausa = document.querySelector('.btn-pausa');



btnPausa.addEventListener('click',()=>{
    
    if (!btnPausa.classList.contains('btn-avance')) {
        btnPausa.classList.add('btn-avance');
        clearInterval(avanceAutomatico)
        avanceAutomaticoPausa = true;

    }else if(btnPausa.classList.contains('btn-avance')){
        btnPausa.classList.remove('btn-avance');
        iniciarIntervalo();
        avanceAutomaticoPausa = false;
    }
});

let btnTamaño = document.querySelector('.btn-tamaño');
let degradadoOscuroSlider = document.querySelector('.degradado-oscuro-slider');

btnTamaño.addEventListener('click',()=>{
    
    if (!btnTamaño.classList.contains('btn-tamaño-reducir')) {
        btnTamaño.classList.add('btn-tamaño-reducir');
        containerSlider.classList.add('container-slider-agrandado');
        slider.classList.add('slider-agrandado');
        degradadoOscuroSlider.classList.add('degradado-oscuro-slider-agrandado')
        
    }else if(btnTamaño.classList.contains('btn-tamaño-reducir')){
        btnTamaño.classList.remove('btn-tamaño-reducir');
        containerSlider.classList.remove('container-slider-agrandado');
        slider.classList.remove('slider-agrandado');
        degradadoOscuroSlider.classList.remove('degradado-oscuro-slider-agrandado')
    }
});

let btnRecargar = document.querySelector('.btn-recargar');

btnRecargar.addEventListener('click', ()=>{
    location.reload();
});

window.addEventListener('resize', function() {
    const nuevoAncho = window.innerWidth;

    if (Math.abs(nuevoAncho - anchoVentana) >= 100) {
        
        btnRecargar.classList.add('btn-recargar-activado');

        setTimeout(() => {
            btnRecargar.classList.remove('btn-recargar-activado');
        }, 5000);
    }
});


let btnCreditos = document.querySelector('.btn-creditos');
let modalCreditos = document.querySelector('.modal-creditos');
let bloqueoPantalla = document.querySelector('.bloqueo-pantalla');

btnCreditos.addEventListener('click', ()=>{
    if(!modalCreditos.classList.contains('modal-creditos-activado')){
        modalCreditos.classList.add('modal-creditos-activado');
        bloqueoPantalla.classList.add('bloqueo-pantalla-activado');
    
    }
});

bloqueoPantalla.addEventListener('click', ()=>{
    if(modalCreditos.classList.contains('modal-creditos-activado')){
        modalCreditos.classList.remove('modal-creditos-activado');
        bloqueoPantalla.classList.remove('bloqueo-pantalla-activado');
    }
});
