import { cargarCarrito } from "./getCarrito.js";

const category = localStorage.getItem("category");
console.log(category);
const urlBase = "http://localhost:2000";

const getCategories = async () => {
  const category = localStorage.getItem("category");
  const response = await fetch(`${urlBase}/${category ? category : "mujer"}`);
  return response.json();
};
const categoriaHombre = document.getElementById("action-hombre");
categoriaHombre.addEventListener("click", () => {
  localStorage.setItem("category", "hombre");
  pintarCategoria();
  
});

const categoriaMujer = document.getElementById("action-mujer");
categoriaMujer.addEventListener("click", () => {
  localStorage.setItem("category", "mujer");
  pintarCategoria();
  
});

const rowCategory = document.getElementById("row-category");

const titleCategory = document.getElementById("title-category");
const containerDetails = document.getElementById("contenedorDetail");

const pintarCategoria = () => {
  getCategories().then((categories) => {
    categories.forEach((item) => {
      const id = item.id;
      const priceFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "COP",
      }).format(item.price);

      titleCategory.innerHTML = `<h1 id="title-category" class="text-mcshop text-center py-2 text-uppercase">${category}</h1>`;
      rowCategory.innerHTML += `
      <div class="col col-md-3 my-4">
          <div class="card">
              <img src="${item.image}"
                  class="card-img-top card-image" alt="${item.name}">
              <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <h4 class="card-title">${priceFormat}</h4>
                  <button id="${id}" class="btn btn-primary productDetails"  data-bs-target="#detalle-producto" href="../pages/category.html">Ver</button>
              </div>
          </div>
      </div>`;
    });
  });
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("productDetails")) {
    let id = e.target.id;
    localStorage.setItem("productId", JSON.stringify(id));
    window.location.href = "../pages/detailProduct.html";
  }
});
pintarCategoria();
cargarCarrito();
