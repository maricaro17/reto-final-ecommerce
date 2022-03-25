import { addToCar } from "./addToCar.js";
import { cargarCarrito } from "./getCarrito.js";


const urlBase = "http://localhost:2000";
const productId = JSON.parse(localStorage.getItem("productId"));
const category = localStorage.getItem("category");
const containerDetails = document.getElementById("container");
const getCategoriesById = async (productId, category) => {
  const response = await fetch(`${urlBase}/${category}/${productId}`);
  return response.json();
};

getCategoriesById(productId, category).then((data) => {
  const priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
  }).format(data.price);
  containerDetails.innerHTML = `
      <div class='row g-0 w-75 justify-content-center'>
      <div class='col-md-3 mx-2 my-2'>
         <img class='w-100 my-5 ms-4' src="${data.image}" alt="${data.name}">
      </div>
      <div class='col-md-8'>
         <div class="my-6 mx-5 mt-5">
         <h2 class="modal-title">${data.name}</h2>
             <h3>Precio: ${priceFormat}</h3>
            
             <p> Descripcion: ${data.description}</p>
             <h5> Talla:${data.talla}</h5>
             <h5> Color: ${data.color}</h5>
             <label for="cantidad">Cantidad</label>
             <input id="cantidad" value="1" type="number" min="1"> <br>
             
            <button id="add" class='btn mt-5 btn-outline-primary carrito'>Agregar al carrito</button>
             
         </div>
     </div>
  </div>
    `;
  const cantidad = document.getElementById("cantidad");
  const add = document.getElementById("add");

  add.addEventListener("click", () => {
      console.log("hola");
    addToCar({
      ...data,
      category,
      cantidad: Number(cantidad.value),
    });
    cargarCarrito();
  });
  
});
