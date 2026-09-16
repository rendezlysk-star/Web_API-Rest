const API_URL = "https://dummyjson.com/products";

//botón para carga los productos
const loadProductsButton = document.getElementById("load-products");
//input para ingresar el nombre del producto a buscar
const nameFilter = document.getElementById("name-filter");
//contenedor para mostrar los productos
const productsContainer = document.getElementById("products-container");
// para mostrar la cantidad de productos
const productsCounter = document.getElementById("products-counter");

//variable global para guardar los productos recuperados del API
let products = [];

//función para consultar los productos del API
async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    products = data.products;
    displayProducts(products);
  } catch (error) {
    console.log("Error al cargar los productos:", error);
  }
}

// Función para crear el card en el html
//ID, title, description y price
function displayProducts(productsToDisplay) {
  productsContainer.innerHTML = "";

  productsCounter.textContent = `Mostrando ${productsToDisplay.length} productos`;

  productsToDisplay.forEach((product) => {
    const card = document.createElement("article");
    card.classList.add("product-card");

    card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <p><strong>#${product.id}</strong></p>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p><strong>Precio:</strong> $${product.price}</p>
        `;

    productsContainer.appendChild(card);
  });
}

function applyFilters() {
  const searchText = nameFilter.value.toLowerCase().trim();

  /*
    // 1. Usando foreach
    const filteredProducts = [];
    products.forEach(product => {
        if (product.title.toLowerCase().includes(searchText)) {
            filteredProducts.push(product);
        }
    });
    */

  // 2. Usando filter e includes
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText),
  );
  displayProducts(filteredProducts);
}

loadProductsButton.addEventListener("click", loadProducts);
nameFilter.addEventListener("input", applyFilters);
