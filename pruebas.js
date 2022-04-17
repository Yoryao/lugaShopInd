
// FUNCION MOSTRAR MODAL con detalle del producto.
function verDetalle(id, item) {

const titulo = document.getElementById("h1Modal")
const description = document.getElementById("h2Modal")
titulo.innerText = item.title
description.innerText = item.description

  const modal = document.getElementById("modalContainer");
  modal.classList.add("mostrar");

  console.log("funciona el detalle." + id);
}

//ocultar modal
function ocultarDetalle() {
  const modal = document.getElementById("modalContainer");
  modal.classList.remove("mostrar");
  console.log("Cerrar Modal");
}
