let pagina = 1;
const enlacesDiv = document.querySelector('.enlaces-menu');
const enlaces = document.querySelectorAll('.enlaces-menu span');
const ham = document.querySelector('.ham');
const barras = document.querySelectorAll('.ham span');
const body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    //La idea es que esta función consulte a una API donde esten todos los trabajos
    mostrarObra();

    mostrarSeccion();


    //
    cambiarPagina();
}

function mostrarSeccion() {

    const seccionActual = document.querySelector(`#link-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');
    enlacesDiv.classList.remove('activado');

}

function cambiarPagina() {

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.link);
            body.classList.remove('fijar-body');


            //Eliminar mostrar-seccion de la seccion anterior
            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');

            const seccion = document.querySelector(`#link-${pagina}`);

            seccion.classList.add('mostrar-seccion');
            enlacesDiv.classList.toggle('activado');

            barras.forEach(child => { child.classList.toggle('animado') });
        })
    })

}

async function mostrarObra() {
    try {
        const resultado = await fetch('./obras.json');
        const db = await resultado.json();

        const { obras } = db;

        //Generar HTML
        obras.forEach(obra => {
            const { id, nombre, descripcion, anio, imagenes } = obra;


            //DOM scripting 


            //agregar imagenes 
            const imagenesObra = document.createElement('ul');
            imagenes.forEach(img => {
                const imagen = document.createElement('IMG');
                imagen.src = img;
                const lista = document.createElement('LI');

                imagen.dataset.imagenId = img;


                //agrego imagenen a html
                lista.appendChild(imagen);
                imagenesObra.appendChild(lista);

                //agrego evento a imagenes
                imagen.onclick = agrandarImagen;
            })

            // Se crea parrafo con nombre
            const nombreObra = document.createElement('P');
            nombreObra.textContent = nombre;
            nombre.dataset.nombreId = nomb;
            //se le agrega la clase para poder darle estilso css
            nombreObra.classList.add('nombre-obra');


            // Se crea parrafo con descripcion
            const descripcionObra = document.createElement('P');
            descripcionObra.textContent = descripcion;

            //se le agrega la clase para poder darle estilso css
            descripcionObra.classList.add('descripcion-obra');


            // Se crea parrafo con fecha
            const anioObra = document.createElement('P');
            anioObra.textContent = anio;

            //se le agrega la clase para poder darle estilso css
            anioObra.classList.add('anio-obra');


            //se le agrega la clase para poder darle estilso css
            imagenesObra.classList.add('imagenes-obra');

            //Inyectar array imagenes en imagenes-obra
            //se crea div contenedor de obra
            const obraContenedor = document.createElement('DIV');
            obraContenedor.classList.add('obra-contenedor');

            //Inyectar nombre y fecha en obra-contenedor en HTML
            obraContenedor.appendChild(imagenesObra);



            //Inyectar en el HTML
            document.querySelector('#link-1').appendChild(obraContenedor);


        })
    } catch (error) {
        console.log(error);
    }
}

ham.addEventListener('click', () => {
    enlacesDiv.classList.toggle('activado');
    body.classList.toggle('fijar-body');
    barras.forEach(child => { child.classList.toggle('animado') });


})

function agrandarImagen(e) {

    const imagen = document.createElement('IMG');
    imagen.src = e.target.dataset.imagenId;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);

    overlay.classList.add('overlay');

    //cerrar cuando se hace click en cualquier parte de la pantalla 
    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    //mostrar en el HTML

    body.appendChild(overlay);
    body.classList.add('fijar-body');

    //boton para cerrar imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    //agregar evento para que funcione el boton de cerrar
    cerrarImagen.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    overlay.appendChild(cerrarImagen);

    //quitar clase que fija el body cuando 


}