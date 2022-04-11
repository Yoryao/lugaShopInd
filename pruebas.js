document.addEventListener("DOMContentLoaded", () => {
  solicitarData();
});

const solicitarData = async (categoria) => {
  let url = "https://fakestoreapi.com/products/category/" + categoria;

  if (categoria == undefined) {
    url = "https://fakestoreapi.com/products";
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    ponerCards(data);
  } catch (error) {
  } finally {
    loader(false);
  }
};

function verDetalle(id) {
  console.log("funciona el detalle." + id);
}

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
      verDetalle(item.id);
    });
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};

const loader = (state) => {
  const spinner = document.getElementById("spinner");

  if (state) {
    console.log("funciona add");
    spinner.classList.remove("d-none");
  } else {
    console.log("funciona remove");
    spinner.classList.remove("d-none");
  }
};
