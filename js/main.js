let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    id: "1",
    name: "Black Pepper Powder",
    weight: "100g",
    price: 4.0,
    inCart: 0,
  },
  { id: "2", name: "Chilli Powder", weight: "100g", price: 8.0, inCart: 0 },
  { id: "3", name: "Termeric Powder", weight: "100g", price: 5.0, inCart: 0 },
  { id: "4", name: "Cinamon Powder", weight: "100g", price: 6.0, inCart: 0 },
  { id: "5", name: "Carom Seeds", weight: "100g", price: 10.0, inCart: 0 },
  { id: "6", name: "Cloves Powder", weight: "100g", price: 15.0, inCart: 0 },
];

for (let i = 0; i < carts.length; i++)
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.id] == undefined) {
      cartItems = {
        ...cartItems,
        [product.id]: product,
      };
    }

    cartItems[product.id].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = { [product.id]: product };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  console.log("cost", cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="card mb-3" style="max-width: 540px">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img
        src="../img/${item.id}.png"
        class="card-img"
        alt="Black Pepper Powder"
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <div class="row">
          <h5 class="card-title col-8">${item.name}</h5>
          <h5 class="card-title col-4" style="text-align: end">
            $ ${item.inCart * item.price}
          </h5>
        </div>
        <p class="card-text mb-0">Weight: ${item.weight}</p>
        <p class="card-text mb-0">Price: $ ${item.price}</p>
        <p class="card-text mt-0">Item Code: ${item.id}</p>
        <div class="row">
          <button type="button" class="btn btn-dark col-5">
            Remove Item
          </button>
          <div class="def-number-input number-input mb-0 w-100 col-7">
            <div class="quantity">
              <i class="far fa-minus-square"></i>
              <span class="qn">${item.inCart}</span>
              <i class="far fa-plus-square"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
    });

    let totalContainer = document.querySelector(".totalContainer");
    totalContainer.innerHTML += `
    <div class="pt-4">
  <h5 class="mb-3">Total amount</h5>

  <ul class="list-group list-group-flush">
    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
      Amount
      <span>$ ${cartCost}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center px-0">
      Vat(10%)
      <span>$ ${cartCost * 0.1}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
      <div>
        <strong>Total Amount</strong>
      </div>
      <span>
        <strong>$ ${cartCost * 1.1}</strong>
      </span>
    </li>
  </ul>

  <a
    href="shippingDetails.html"
    type="button"
    class="btn btn-primary btn-block"
  >
    CHECKOUT
  </a>
</div>

    `;
  }
}

onLoadCartNumbers();

displayCart();
