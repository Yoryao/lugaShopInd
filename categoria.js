console.log("Productos Funcionando.");

window.onload = function () {
  console.log("On Load Working");
  loadCategorias();
};

//solicitar las categorias
const loadCategorias = async () => {
  try {
    const res = await fetch("categorias.json");
    const data = await res.json();
    loadData(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally del loadCategorias.");
  }
};

function mostrarProductos(id) {
  console.log("Se ha clickeado categoria " + id);
  document.location = "productos.html";
  loadProductos();
}

const loadProductos =  () => {

  console.log("hola")

  // const cardCategoria = document.getElementById("categoriasContainer");
  // const template = document.getElementById("template").content;
  // const fragment = document.createDocumentFragment();

  // data.forEach((item) => {
  //   const clone = template.cloneNode(true);

  //   clone.getElementById("categoryButton").style.backgroundImage = `url('${item.img}')`;
  //   clone.getElementById("categoryP").textContent = item.nombre;
  //   clone
  //     .getElementById("categoryButton")
  //     .addEventListener("click", function () {
  //       mostrarProductos(item.nombre, item.id);
  //     });

  //   fragment.appendChild(clone);
  // });
  // cardCategoria.appendChild(fragment);
};














const loadData = async (data) => {
  const cardCategoria = document.getElementById("categoriasContainer");
  const template = document.getElementById("template").content;
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const clone = template.cloneNode(true);

    clone.getElementById("categoryButton").style.backgroundImage = `url('${item.img}')`;
    clone.getElementById("categoryP").textContent = item.nombre;
    clone
      .getElementById("categoryButton")
      .addEventListener("click", function () {
        mostrarProductos(item.nombre, item.id);
      });

    fragment.appendChild(clone);
  });
  cardCategoria.appendChild(fragment);
};
