import { menuArray } from "./data.js";

const main = document.querySelector(".main");
const cardSection = document.querySelector(".card-section");
const orderSection = document.querySelector(".orders");
const checkoutSection = document.querySelector(".checkout-section");
let orderArray = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.pizza) {
    getOrders(e.target.dataset.pizza);
  } else if (e.target.dataset.hamburger) {
    getOrders(e.target.dataset.hamburger);
  } else if (e.target.dataset.beer) {
    getOrders(e.target.dataset.beer);
  } else if (e.target.id === "complete-order-btn") {
    checkout();
  } else if (e.target.dataset.removePizza) {
    removeOrder(e.target.dataset.removePizza);
  } else if (e.target.dataset.removeHamburger) {
    removeOrder(e.target.dataset.removeHamburger);
  } else if (e.target.dataset.removeBeer) {
    removeOrder(e.target.dataset.removeBeer);
  }
});

document.addEventListener("submit", submit);

function getOrders(menuId) {
  const targetMenuObj = menuArray.filter(function (menu) {
    return menu.id === Number(menuId);
  })[0];

  if (!orderArray.includes(targetMenuObj)) {
    orderArray.push(targetMenuObj);
    displayOrders(orderArray);
  }
}

function displayOrders(orders) {
  let totalPrice = 0;
  let orderHtml = "";
  orders.forEach(function (order) {
    orderHtml += `<div class="order-wrapper">
                        <div class="order-data">
                            <p>${order.name}</p>
                            <button data-remove-${order.name}="${order.id}">remove</button>
                        </div>
                        <span>${order.price}</span>
                    </div>`;
    totalPrice += order.price;
  });
  orderSection.innerHTML = `<h2>Your orders</h2>
                                ${orderHtml}
                                <div class="order-total-price">
                                    <p class="order-price-el">Total price:</p>
                                    <span>$${totalPrice}</span>
                                </div>
                                <button id="complete-order-btn" class="complete-order-btn">Complete order</button>
                                `;
}

function checkout() {
  checkoutSection.classList.remove("hidden");
}

function removeOrder(orderId) {
  orderArray = orderArray.filter(function (order) {
    return order.id !== Number(orderId);
  });

  if (orderArray.length > 0) {
    displayOrders(orderArray);
  } else {
    orderSection.innerHTML = "";
  }
}

function submit(e) {
  e.preventDefault();
  const form = document.getElementById("form");
  const formData = new FormData(form);
  const fullName = formData.get("fullName");

  orderSection.innerHTML = `<p class="order-completed">Thanks, ${fullName}! Your order is on its way!</p>`;
  document.querySelector("input[type=text]").value = "";
  document.querySelector("input[type=number]").value = "";
  checkoutSection.classList.add("hidden");

  setTimeout(function () {
    orderSection.innerHTML = "";
  }, 3000);
}

function getMenuHtml() {
  let menuHtml = "";

  menuArray.forEach(function (menu) {
    menuHtml += `<div class="card-wrapper">
                        <div id="${menu.id}" class="card-data">
                            <h2>${menu.emoji}</h2>
                            <p>${menu.name} <span>${menu.ingredients}</span> <span></span>$${menu.price}</p>
                        </div>
                        <i class="fa-solid fa-plus" data-${menu.name}="${menu.id}"></i>
                    </div>`;
  });

  return menuHtml;
}

function render() {
  cardSection.innerHTML = getMenuHtml();
}

render();
