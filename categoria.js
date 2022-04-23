//VALIDAR NO SUMAR ITEMS YA EXISTENTES.
//realizar toast para producto existente en el carrito
console.log("Productos Funcionando.");

(function () {
  // https://dashboard.emailjs.com/admin/integration
  emailjs.init("iMFHtbtT-GUb9TxOF");
})();

//0)DECLARO VARIABLES A UTILIZAR
let carrito = [
  {
    posicion: 1,
    nombre: "Women ",
    id: 58,
  },
  {
    posicion: 2,
    nombre: "Heel",
    id: 48,
  },
  {
    posicion: 3,
    nombre: "Strip",
    id: 47,
  },
];

//1) llamo a las categorias.
window.onload = function () {
  console.log("On Load Working");
  loadCategorias();
};

//2) capturo las categorias
const loadCategorias = async () => {
  try {
    const res = await fetch("json/categorias.json");
    const data = await res.json();
    mostrarCategorias(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally del loadCategorias.");
  }
};

//3) muestro las categorias
const mostrarCategorias = async (data) => {
  const cardCategoria = document.getElementById("categoriasContainer");
  const template = document.getElementById("template").content;
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const clone = template.cloneNode(true);

    clone.getElementById(
      "categoryButton"
    ).style.backgroundImage = `url('${item.img}')`;
    clone.getElementById("categoryP").textContent = item.nombre;
    clone
      .getElementById("categoryButton")
      .addEventListener("click", function () {
        elegirCategoria(item.nombre, item.id);
      });

    fragment.appendChild(clone);
  });
  cardCategoria.appendChild(fragment);
};

//4) elijo la categoria.
function elegirCategoria(id) {
  console.log("Se ha clickeado categoria " + id);

  loadProductos(id);
}

//5) cargar productos.
const loadProductos = async (id) => {
  try {
    const res = await fetch("json/productos.json");
    const data = await res.json();
    console.log("productos.json CARGADO")
    let filtrado = data.filter((item) => item.category == id);
    
    mostrarProductos(filtrado);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally del loadProductos.");
  }
};

//6) mostrar Productos
const mostrarProductos = async (data) => {
  const cardProductos = document.getElementById("productosContainer");
  cardProductos.innerHTML = "";

  const templateProducto = document.getElementById("templateProductos").content;
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const clone = templateProducto.cloneNode(true);

    clone.getElementById("productosImage").setAttribute("src", item.images[0]);
    clone
      .getElementById("productosImage")
      .setAttribute("alt", `Photo of ${item.title}`);
    clone.getElementById("productosTitle").textContent = item.title;
    clone.getElementById("productosInfo").textContent = item.description;
    clone.getElementById("addButton").addEventListener("click", function () {
      verDetalle(item);
    });
    //       mostrarProductos(item.nombre, item.id);
    fragment.appendChild(clone);
  });
  cardProductos.appendChild(fragment);
};

const verDetalle = async (item) => {
  const modal = document.getElementById("modalContainer");
  modal.classList.add("mostrar");

  const cardDetalle = document.getElementById("detalleContainer");
  cardDetalle.innerHTML = "";

  const templateDetalle = document.getElementById("templateDetalle").content;
  const fragment = document.createDocumentFragment();

  const clone = templateDetalle.cloneNode(true);

  clone.getElementById("addToCart").addEventListener("click", function () {
    agregarCarrito(item);
  });

  clone.getElementById("detalleImagen").setAttribute("src", item.images[0]);
  clone.getElementById("detalleNombre").textContent = item.title;
  clone.getElementById("detalleDescripcion").textContent = item.description;

  clone.getElementById("detalleImagen1").setAttribute("src", item.images[1]);
  clone.getElementById("detalleImagen2").setAttribute("src", item.images[2]);
  clone.getElementById("detalleImagen3").setAttribute("src", item.images[3]);

  fragment.appendChild(clone);

  cardDetalle.appendChild(fragment);
};

function cerrarModal() {
  let modal = document.getElementById("modalContainer");
  console.log("cerrando Modal");
  modal.classList.remove("mostrar");
}

function agregarCarrito(item) {
  const productoExiste = carrito.find((producto) => producto.id === item.id);

  if (productoExiste === undefined) {
    let productoCarrito = {
      posicion: carrito.length + 1,
      nombre: item.title,
      id: item.id,
    };
    carrito.push(productoCarrito);
    sumarItems();

    console.log(carrito);
  } else {
    console.log("El producto ya existe en el carrito.");
  }
}

let contador = 0;

function sumarItems() {
  contador++;
  document.getElementById("cartItems").textContent = contador;
}

function abrirCarrito() {
  document.getElementById("cartItems").addEventListener("click", () => {
    const modal = document.getElementById("modalCarrito");
    modal.classList.add("mostrarCarrito");
  });

  let tabla = "";
  carrito.forEach((producto) => {
    let fila = `<tr><td> ${producto.nombre} </td><td> ${producto.id}</td><td><button onclick="borrarIt(${producto.id})"> X </button></tr>`;
    tabla += fila;
  });

  document.getElementById("items").innerHTML = tabla;
}

function borrarIt(item) {
  let newCarrito = carrito.filter((producto) => producto.id != item);
  carrito = newCarrito;
  abrirCarrito();
}

function vaciarCarrito(){
  carrito = [];
  abrirCarrito();
  document.getElementById("items").innerText = "No hay productos en el Carrito.";
}

function mostrarFormulario(){
let texto = "Hola Lucia, estoy interesada en los siguientes productos: ";

carrito.forEach(producto => 
  texto += `${producto.nombre}, con codigo ${producto.id}.` 

  
  )

document.getElementById("textoFormulario").innerText = texto
  console.log("se mostro el formulario." + texto)
  cerrarCarrito();
}



     document.getElementById("contact-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("se envio formulario")
        // generate a five digit number for the contact_number variable
        this.contact_number.value = (Math.random() * 100000) | 0;
        // these IDs from the previous steps
        emailjs.sendForm("contact_service", "contact_form", this).then(
          function () {
            console.log("SUCCESS!");
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
      });




function cerrarCarrito() {
  const modal = document.getElementById("modalCarrito");
  console.log("cerrando Modal");
  modal.classList.remove("mostrarCarrito");
}

window.onclick = function (event) {
  const modalCarrito = document.getElementById("modalCarrito");
  let modal = document.getElementById("modalContainer");

  if (event.target == modal) {
    modal.classList.remove("mostrar");
  }
  if (event.target == modalCarrito) {
    modalCarrito.classList.remove("mostrarCarrito");
  }
};
