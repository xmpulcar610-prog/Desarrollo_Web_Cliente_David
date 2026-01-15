const usuario = {
    nombre: 'David Fernandez',
    imagen: 'imagen.jpg'
}

const tarjeta = `
    <div class="card">
        <img src= "${usuario.nombre}" alt= "${usuario.imagen}" />
        <h2>${usuario.nombre}</h2>
    </div>
`

console.log(tarjeta)