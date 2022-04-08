(function () {
  // https://dashboard.emailjs.com/admin/integration
  emailjs.init("iMFHtbtT-GUb9TxOF");
})();

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
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
};

let pintarProductos = async () => {
 let listado = await  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    //.then((json) => console.log(json));

  let primero = listado[0]
  document.getElementById("primerProducto").innerText = primero.title;
  document.getElementById("myImage").src = "https://i.pravatar.cc";



  
}

window.onload = pintarProductos();
