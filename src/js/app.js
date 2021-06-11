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
        //
        //Generar HTML
        obras.forEach(obra => {
            const { id, nombre, descripcion, anio, imagenes } = obra;

            //agregar imagenes 
            const imagenesObra = document.createElement('ul');
            imagenes.forEach(img => {
                const imagen = document.createElement('IMG');
                imagen.src = img;
                const lista = document.createElement('LI');



                //agrego imagenen a html
                lista.appendChild(imagen);
                imagenesObra.appendChild(lista);

                //agrego evento a imagenes
                //imagen.onclick = agrandarImagen;
            })

            imagenesObra.classList.add('imagenes-obra');

            // Se crea parrafo con nombre
            const nombreObra = document.createElement('P');
            nombreObra.textContent = nombre;
            nombreObra.classList.add('nombre-obra');


            // Se crea parrafo con descripcion
            const descripcionObra = document.createElement('P');
            descripcionObra.textContent = descripcion;
            descripcionObra.classList.add('descripcion-obra');

            // Se crea parrafo con fecha
            const anioObra = document.createElement('P');
            anioObra.textContent = anio;
            anioObra.classList.add('anio-obra');



            const obraContenedor = document.createElement('DIV');
            obraContenedor.classList.add('obra-contenedor');
            obraContenedor.dataset.divObraId = id;


            //Inyectar nombre y fecha en obra-contenedor en HTML
            obraContenedor.appendChild(imagenesObra);



            //Inyectar en el HTML
            document.querySelector('#link-1').appendChild(obraContenedor);

            obraContenedor.addEventListener('click', e => {
                e.preventDefault();
                const overlay = document.createElement('DIV');
                overlay.appendChild(imagenesObra);
                overlay.appendChild(nombreObra);
                overlay.appendChild(anioObra);
                overlay.appendChild(descripcionObra);

                overlay.classList.add('overlay');

                body.appendChild(overlay);
                body.classList.add('fijar-body')


                //boton para cerrar imagen
                const cerrarImagen = document.createElement('P');
                cerrarImagen.textContent = 'X';
                cerrarImagen.classList.add('btn-cerrar');
                overlay.appendChild(cerrarImagen);


                //agregar evento para que funcione el boton de cerrar
                cerrarImagen.onclick = function() {
                        overlay.remove();
                        body.classList.remove('fijar-body');
                    }
                    //quitar overlay y fijar-body cuando se hace click en cualquier parte del contenedor
                overlay.onclick = function() {
                    overlay.remove();
                    body.classList.remove('fijar-body');
                }

            })


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