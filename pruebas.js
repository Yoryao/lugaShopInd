document.addEventListener("DOMContentLoaded", () => {
  solicitarData();
});

const solicitarData = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    ponerCards(data);
  } catch (error) {
  } finally {
    loader(false);
  }
};

const ponerCards = (data) => {
  console.log(data);

  const cards = document.getElementById("card-dinamicas");
  const template = document.getElementById("templateCard").content;
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    //   console.log(item)
    //   console.log(item.title);
      const clone = template.cloneNode(true);
      clone.getElementById("card-title").textContent = item.title;
      clone.getElementById("card-text").textContent = item.description;
      clone.getElementById("card-img").setAttribute ("src",  item.image)

      console.log(item)
      console.log(item.title)

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


//VI HASTA 1.37 HRS
