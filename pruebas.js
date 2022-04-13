//al cargar ejecutar la funcion de solicitar productos a la api, y mostrar.
document.addEventListener("DOMContentLoaded", () => {
  solicitarData();
});


//mostrar los productos.
const ponerCards = (data) => {
  const clearTemplate = document.getElementById("card-dinamicas");
  clearTemplate.innerHTML = `<section class="row" id="card-dinamicas"></section>`;

  const cards = document.getElementById("card-dinamicas");
  const template = document.getElementById("templateCard").content;
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const clone = template.cloneNode(true);

    clone.getElementById("card-title").textContent = item.title;
    clone.getElementById("card-text").textContent = item.description;
    clone.getElementById("card-img").setAttribute("src", item.image);
    clone.getElementById("detailButton").addEventListener("click", function () {
      verDetalle(item.id, item);
    });
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};

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

// const loader = (state) => {
//   const spinner = document.getElementById("spinner");

//   if (state) {
//     console.log("funciona add");
//     spinner.classList.remove("d-none");
//   } else {
//     console.log("funciona remove");
//     spinner.classList.remove("d-none");
//   }
// };
