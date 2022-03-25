import { cargarCarrito } from "./getCarrito.js";

const productList = document.getElementById("product-list");
const total = document.getElementById("total");
const clear = document.getElementById("clear");
const pay = document.getElementById("pay");
const totalResult = [];
const pintarCarrito = () => {
  const car = cargarCarrito();
  car.forEach((item) => {
    const subTotal = item.price * item.cantidad;
    totalResult.push(subTotal);
    const priceFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "COP",
    }).format(item.price);
    const subTotalFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "COP",
    }).format(subTotal);
    
    productList.innerHTML += `
        <tr>
            <th scope="row"><img
                    src="${item.image}"
                    alt="${item.name}" width="200"></th>
            <td>${item.cantidad}</td>
            <td>${priceFormat}</td>
            <td>${subTotalFormat}</td>
            <td>
                <button id=${item.id} class="delete-item">
                    <span> <i class="fa-solid fa-trash"></i></span>
                </button>
            </td>
        </tr>
        
        `;
  });
  
const totalFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
  }).format(totalResult.reduce((a, b) => a + b));
  total.innerHTML = totalFormat;
  
  clear.addEventListener("click", () => {
    localStorage.removeItem("car");
    productList.innerHTML = "";
    total.innerHTML = "COP 0.00";
    cargarCarrito();
  });
  
  pay.addEventListener("click", () => {
    window.location.href = "../pages/form.html";
  });
  
  const deleteItem = (id) => {
    const car = cargarCarrito();
    const products = car.filter((item) => item.id !== Number(id));
    localStorage.setItem("car", JSON.stringify(products))
    window.location.href = "../pages/carrito.html"
  };
  
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-item")) {
      let id = e.target.id;
      deleteItem(id);
    }
    cargarCarrito();
    
  });
};
pintarCarrito();

