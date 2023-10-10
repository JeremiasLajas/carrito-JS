// variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando 'Agregar al Carrito'
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    

}

// Funciones
function vaciarCarrito(){
    articulosCarrito = [];
    
    limpiarHTML();
}
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) { //Nos aseguramos de que el usuario haya presionado en agregar carrito
        const cursoSeleccionado = e.target.parentElement.parentElement //Accedemos a todo el div que tiene el contenido del curso
        leerDatosCurso(cursoSeleccionado);
        // En este if definimos desde el elementos en donde hacemos click hasta que parent debe colectar la informacion para extraer
    }

}
// Eliminar curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina el arreglo de articulosCarrito por la data-id
        articulosCarrito = articulosCarrito.filter(cursoSeleccionado => cursoSeleccionado.id !== cursoId);

       carritoHTML(); //Iteramos sobre el carrito y mostramos el html
    }

   
}
// Lee el contenido del HTML al que le damos click y extrae la informacion 
function leerDatosCurso(cursoSeleccionado) {
    console.log(cursoSeleccionado);

    // Creamos un objeto con el contenido del curso seleccionado que acabaremos mostrando

    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1


    }
    // Antes de agregar los elementos al carrito debemos verificar si el curso seleccionado ya existe en el carrito y que se acrualice la cantidad
    const existe = articulosCarrito.some(cursoSeleccionado => cursoSeleccionado.id === infoCurso.id)
    if (existe) {
        // actualizamos la cantidad del curso seleccionado
        const cursosEnCarrito = articulosCarrito.map(cursoSeleccionado => {
            if (cursoSeleccionado.id === infoCurso.id) {
                cursoSeleccionado.cantidad++;
                return cursoSeleccionado;
            } else {
                return cursoSeleccionado;
            }
        })
        articulosCarrito = [...cursosEnCarrito];
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



    console.log(articulosCarrito);

    carritoHTML();

}


// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiamos el html para que se vaya actualizando limpiando el html previo 
    limpiarHTML();

    // Recorre el carrito y genera el html
    articulosCarrito.forEach(cursoSeleccionado => {
        const { imagen, titulo, precio, cantidad } = cursoSeleccionado //Extytraemos las propiedades del objeto y las convertimops en cariables, trabajando de forma directa
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src= "${imagen}" width="100">
        </td>
       <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
             <a href="#" class="borrar-curso" data-id="${cursoSeleccionado.id}"> X </a>
        </td>
        
        `;

        // Agrega el HTML del carrito en el tbody
        // Esto se debe hacer dentro del forEach ya que se tiene que ejutar la cantidad de veces que se agregue un cursoSeleccionado al carrito
        contenedorCarrito.appendChild(row);
    })

}

// Eliminar cursos del tbody para limpiar el html en la medida que se vaya actualizando

function limpiarHTML() {
    // Forma lenta de limpiar el HTML
    // contenedorCarrito.innerHTML = '';

    // Forma rapida
    // Lo que hace este while es comprar si existen hijos dentro del contenedor y los va eliminando 
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }


}

