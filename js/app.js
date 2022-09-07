const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('vaciar-carrito');

const contadorCarrito = document.getElementById('contador-carrito');

const precioTotal = document.getElementById('precio-total');

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
  }
});

botonVaciar.addEventListener('click', () => {
  carrito.length = 0;
  actualizarCarrito();
});

stockProductos.forEach((producto) => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
  <img src=${producto.img} alt="">
  <h3>${producto.nombre}</h3>
  <p>${producto.desc}</p>
  <p class="precioProducto">Precio: $ ${producto.precio}</p>
  <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
  `;

  contenedorProductos.appendChild(div);

  const boton = document.getElementById(`agregar${producto.id}`);

  boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id);
  });
});

const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === prodId);
    carrito.push(item);
  }
  actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);

  const indice = carrito.indexOf(item);

  carrito.splice(indice, 1);

  actualizarCarrito();
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = ''; //para q se borre el nodo cuando llamo a la funcion actualizarCarrito()

  carrito.forEach((prod) => {
    const div = document.createElement('div');
    div.className = 'productoEnCarrito';
    div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: $ ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></button>
        `;

    contenedorCarrito.appendChild(div);

    localStorage.setItem('carrito', JSON.stringify(carrito));
  });

  contadorCarrito.innerText = carrito.length;

  precioTotal.innerText = carrito.reduce((acum, prod) => acum + prod.precio, 0);
};
