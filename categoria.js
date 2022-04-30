//VALIDAR NO SUMAR ITEMS YA EXISTENTES.
//realizar toast para producto existente en el carrito
console.log("Productos Funcionando.");

(function () {
  // https://dashboard.emailjs.com/admin/integration
  emailjs.init("iMFHtbtT-GUb9TxOF");
})();

//0)DECLARO VARIABLES A UTILIZAR
let carrito = [];

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
    const catalogo = await res.json();
    let filtrado = catalogo.filter((item) => item.category == id);

    if (id == undefined) {
      mostrarProductos(catalogo);
    } else {
      mostrarProductos(filtrado);
    }
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
      .setAttribute("alt", `Photo of ${item.title}`)
  
    clone.getElementById("productosTitle").textContent = item.title;
    clone.getElementById("productosInfo").textContent = item.description;
    clone.getElementById("addButton").addEventListener("click", function () {
      verDetalle(item);
    });

    fragment.appendChild(clone);
  });
  cardProductos.appendChild(fragment);
};



const verDetalle = async (item) => {
  console.log("Ver detalle " + item.title);
  const modal = document.getElementById("modalDetalle");
  modal.classList.add("mostrar");

  const cardDetalle = document.getElementById("detalleContainer");
  cardDetalle.innerHTML = "";

  const templateDetalle = document.getElementById("templateDetalle").content;
  const fragment = document.createDocumentFragment();

  const clone = templateDetalle.cloneNode(true);

  clone.getElementById("addToCart").addEventListener("click", function () {
    agregarCarrito(item);
    cerrarModal();
  });

  clone.getElementById("detalleImagen").setAttribute("src", item.images[0]);
  clone.getElementById("detalleNombre").textContent = item.title;
  clone.getElementById("detalleDescripcion").textContent = item.description;

  fragment.appendChild(clone);

  cardDetalle.appendChild(fragment);
};

function cerrarModal() {
  let modal = document.getElementById("modalDetalle");
  console.log("cerrando Modal");
  modal.classList.remove("mostrar");
}

function agregarCarrito(item) {
  const productoExiste = carrito.find((producto) => producto.id === item.id);
  console.log("se Agrego al Carrito");
  if (productoExiste === undefined) {
    let productoCarrito = {
      posicion: carrito.length + 1,
      nombre: item.title,
      id: item.id,
    };
    carrito.push(productoCarrito);
    sumarItems();
    cerrarCarrito();
    Toastify({
      text: "El producto se agrego al carrito.",
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "pink",
        borderRadius: "5px",
        color: "black",
      },
    }).showToast();
  } else {
    console.log("El producto ya existe en el carrito.");
    Toastify({
      text: "El producto ya existe en el carrito.",
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "pink",
        borderRadius: "5px",
        color: "black",
      },
    }).showToast();
  }
}

let contador = 0;

function sumarItems() {
  contador++;
  document.getElementById("cartItems").textContent = contador;
}

function restarItems() {
  contador--;
  document.getElementById("cartItems").textContent = contador;
}

function resetItems() {
  contador = 0;
  document.getElementById("cartItems").textContent = contador;
}

function abrirCarrito() {
  const modal = document.getElementById("modalCarrito");
  modal.classList.add("mostrarCarrito");

  let tabla = "";
  carrito.forEach((producto) => {
    let fila = `<tr><td> ${producto.id} </td><td> ${producto.nombre}</td><td><button onclick="borrarIt(${producto.id})"> X </button></tr>`;
    tabla += fila;
  });

  document.getElementById("items").innerHTML = tabla;
}

function borrarIt(item) {
  Toastify({
    text: `Se borro el item ${item}.`,
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "pink",
      borderRadius: "5px",
      color: "black",
    },
  }).showToast();
  let newCarrito = carrito.filter((producto) => producto.id != item);
  carrito = newCarrito;
  restarItems();
  abrirCarrito();

  if (carrito.length == 0) {
    vaciarCarrito();
  }
}

function vaciarCarrito() {
  carrito = [];
  resetItems();
  abrirCarrito();
  document.getElementById("items").innerText =
    "No hay productos en el Carrito.";
}

function mostrarFormulario() {
  let textoForm = document.getElementById("textoForm");
  textoForm.value = "Pedido";

  const modal = document.getElementById("modalFormulario");
  modal.classList.add("mostrarFormulario");

  textoPedido = "Hola Lucia, estoy interesada en los siguientes productos: ";

  carrito.forEach(
    (producto) =>
      (textoPedido += `${producto.nombre}, con codigo ${producto.id}. `)
  );

  document.getElementById("textoForm");
  textoForm.value = textoPedido;
  console.log("se mostro el formulario." + textoPedido);
  cerrarCarrito();
}

function enviarFormulario() {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("se envio formulario");
      // generate a five digit number for the contact_number variable
      this.contact_number.value = (Math.random() * 100000) | 0;
      // these IDs from the previous steps
      emailjs.sendForm("contact_service", "contact_form", this).then(
        function () {
          Toastify({
            text: "Se envio el pedido, en breve nos comunicaremos con vos.",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "pink",
              borderRadius: "5px",
              color: "black",
            },
          }).showToast();

          vaciarCarrito();
          cerrarCarrito();
          cerrarFormulario();
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    });
}

function cerrarFormulario() {
  const modal = document.getElementById("modalFormulario");
  console.log("cerrando Modal");
  modal.classList.remove("mostrarFormulario");
}

function cerrarCarrito() {
  const modal = document.getElementById("modalCarrito");
  console.log("cerrando Modal");
  modal.classList.remove("mostrarCarrito");
}

window.onclick = function (event) {
  const modalCarrito = document.getElementById("modalCarrito");
  const modal = document.getElementById("modalDetalle");
  const modalFormulario = document.getElementById("modalFormulario");

  if (event.target == modal) {
    modal.classList.remove("mostrar");
  }
  if (event.target == modalCarrito) {
    modalCarrito.classList.remove("mostrarCarrito");
  }
  if (event.target == modalFormulario) {
    modalFormulario.classList.remove("mostrarFormulario");
  }
};
