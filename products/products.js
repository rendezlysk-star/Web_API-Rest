const url = "https://fakestoreapi.com/products";
const contenedor = document.getElementById("contenedor");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((producto) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}">
        <p>#${producto.id}</p>
        <h3>${producto.title}</h3>
        <p>Precio: $${producto.price}</p>
      `;

      contenedor.appendChild(card);
    });
  });
