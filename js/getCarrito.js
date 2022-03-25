const getItems = () => {
  return localStorage.getItem("car")
    ? JSON.parse(localStorage.getItem("car"))
    : [];
};

export const cargarCarrito = () => {
  const car = getItems();
  const countHeader = document.getElementById("count-header");
  const count = document.getElementById("count");
  if (car.length > 0) {
    count ? (count.innerHTML = car.length) : 0;
    countHeader.innerHTML = car.length;
  } else {
    count ? (count.innerHTML = car.length) : 0;
    countHeader.innerHTML = 0;
  }
  return car;
};
