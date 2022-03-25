import { cargarCarrito } from "./js/getCarrito.js";

const categoriaHombre = document.getElementById("action-hombre");
categoriaHombre.addEventListener("click", () => {
  localStorage.setItem("category", "hombre");
  window.location.href = "./pages/category.html";
});

const categoriaMujer = document.getElementById("action-mujer");
categoriaMujer.addEventListener("click", () => {
  localStorage.setItem("category", "mujer");
  window.location.href = "./pages/category.html";
});
cargarCarrito();