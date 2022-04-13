console.log("Productos Funcionando.")

window.onload = function () {
  console.log("On Load Working")
  loadCategorias(); 
};

//solicitar las categorias
const loadCategorias = async () => {
    try {

        const res = await fetch("categorias.json");
        const data = await res.json();
        loadData(data);
    } catch (error) {
      console.log(error)
    } 
    finally {
      console.log("finally del loadCategorias.")
    }
};

const loadData = async (data) => {
    const cardCategoria = document.getElementById("categoriasContainer");
    const template = document.getElementById("template").content;
    const fragment = document.createDocumentFragment();

    data.forEach((item)=>{
        const clone = template.cloneNode(true);

        clone.getElementById("categoryButton").setAttribute("onclick" , function ver(){irCategoria(item.id)});
        clone.getElementById("categoryImage").setAttribute("src" , item.img);
        clone.getElementById("categoryImage").setAttribute("alt" , `Photo of ${item.nombre}`);
        clone.getElementById("categoryP").textContent = item.nombre;
              
       
       
        fragment.appendChild(clone);
    })
      cardCategoria.appendChild(fragment);
}

function irCategoria(id) {
  console.log("Se ha clickeado categoria " + id)
}
