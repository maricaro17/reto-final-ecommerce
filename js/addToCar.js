import { cargarCarrito } from "./getCarrito.js";

const car = localStorage.getItem("car")
  ? JSON.parse(localStorage.getItem("car"))
  : [];
const verifyCarItemExistence = (item) => {
  return car.find(
    (element) => element.id === item.id && element.category === item.category
  )
    ? true
    : false;
};
export const addToCar = (item) => {
  console.log(item);
  if (!verifyCarItemExistence(item)) {
    car.push(item);
    localStorage.setItem("car", JSON.stringify(car));
    cargarCarrito();
  } else {
    alert("Este producto ya se enuentra en el carrito");
  }
};
