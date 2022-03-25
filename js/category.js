import { cargarCarrito } from "./getCarrito.js";

const urlBase = "https://mcshop-json-server.herokuapp.com";

const getCategories = async () => {
  let endpoint = localStorage.getItem("category")
    ? localStorage.getItem("category")
    : "mujer";
  const response = await fetch(`${urlBase}/${endpoint}`);
  return response.json();
};

const rowCategoryMujer = document.getElementById("row-category-mujer");
const rowCategoryHombre = document.getElementById("row-category-hombres");
const titleCategory = document.getElementById("title-category");

const pintarCategoria = () => {
  getCategories().then((categories) => {
    categories.forEach((item) => {
      item = { ...item, category: localStorage.getItem("category") };
      const id = item.id;
      const priceFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "COP",
      }).format(item.price);
      console.log(item.category);
      const data = {
        title: `<h1 id="title-category" class="text-mcshop text-center py-2 text-uppercase">${item.category}</h1>`,
        categories: `
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
        </div>`,
      };
      titleCategory.innerHTML = data.title;
      if (item.category === "hombre") {
        rowCategoryHombre.innerHTML += data.categories;
        rowCategoryMujer.innerHTML = "";
      } else if (item.category === "mujer") {
        rowCategoryMujer.innerHTML += data.categories;
        rowCategoryHombre.innerHTML = "";
      }
    });
  });
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

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("productDetails")) {
    let id = e.target.id;
    localStorage.setItem("productId", JSON.stringify(id));
    window.location.href = "../pages/detailProduct.html";
  }
});
pintarCategoria();
cargarCarrito();
