import { cargarCarrito } from "./getCarrito.js";

const urlBase = "http://localhost:2000";
const itemListCar = document.getElementById("item-list-car");
const limpiarCarrito = (item) => {
  localStorage.removeItem(item);
  itemListCar.innerHTML = "";
};
const submit = async (e) => {
  e.preventDefault();  
      const result = await response.json();
      limpiarCarrito("car");

      alert(`
             Su orden ha sido procesada exitosamente.
             numero de orden: ${result.id}
          `);
      cargarCarrito();
    };

form.addEventListener("click", (e) => submit(e), false);
